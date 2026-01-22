import { NextResponse } from 'next/server';
import { getPusherServer } from '@/lib/pusher-server';
import { createOpenAIClient, COUNSELLOR_SYSTEM_PROMPT } from '@/lib/openai';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, messages } = body;

    const openAiKey = process.env.OPENAI_API_KEY;

    if (!roomId || !messages) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!openAiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const pusher = getPusherServer();
    const openai = createOpenAIClient(openAiKey);

    // Notify that counsellor is typing
    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-typing', {
      isTyping: true,
    });

    // Format messages for OpenAI
    const formattedMessages = messages.map((msg: Message) => ({
      role: msg.senderRole === 'counsellor' ? 'assistant' : 'user',
      content: `[${msg.senderName}]: ${msg.content}`,
    }));

    // Get streaming response from OpenAI with 25-second timeout
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: COUNSELLOR_SYSTEM_PROMPT },
        ...formattedMessages,
      ],
      stream: true,
    }, {
      timeout: 25000,
    });

    let fullContent = '';
    const messageId = uuidv4();

    // Send initial message structure
    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-stream-start', {
      id: messageId,
    });

    // Stream chunks
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullContent += content;
        await pusher.trigger(`presence-room-${roomId}`, 'counsellor-stream', {
          id: messageId,
          chunk: content,
        });
      }
    }

    // Send final complete message
    const counsellorMessage: Message = {
      id: messageId,
      roomId,
      senderId: 'counsellor',
      senderName: 'Counsellor',
      senderRole: 'counsellor',
      content: fullContent,
      timestamp: Date.now(),
    };

    await pusher.trigger(
      `presence-room-${roomId}`,
      'counsellor-stream-end',
      counsellorMessage
    );

    // Notify that counsellor stopped typing
    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-typing', {
      isTyping: false,
    });

    return NextResponse.json({ success: true, message: counsellorMessage });
  } catch (error) {
    console.error('Counsellor error:', error);

    // Try to notify that counsellor stopped typing on error
    try {
      const body = await request.clone().json();
      const pusher = getPusherServer();
      await pusher.trigger(`presence-room-${body.roomId}`, 'counsellor-typing', {
        isTyping: false,
      });
    } catch {
      // Ignore cleanup errors
    }

    return NextResponse.json(
      { error: 'Failed to get counsellor response' },
      { status: 500 }
    );
  }
}
