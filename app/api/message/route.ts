import { NextResponse } from 'next/server';
import { getPusherServer } from '@/lib/pusher-server';
import { createOpenAIClient, COUNSELLOR_SYSTEM_PROMPT } from '@/lib/openai';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from '@/types';

async function triggerCounsellorResponse(roomId: string, allMessages: Message[]) {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) return;

  const pusher = getPusherServer();
  const openai = createOpenAIClient(openAiKey);

  try {
    // Notify that counsellor is typing
    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-typing', {
      isTyping: true,
    });

    // Format messages for OpenAI
    const formattedMessages = allMessages.map((msg: Message) => ({
      role: msg.senderRole === 'counsellor' ? 'assistant' as const : 'user' as const,
      content: msg.senderRole === 'counsellor' ? msg.content : `[${msg.senderName}]: ${msg.content}`,
    }));

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: COUNSELLOR_SYSTEM_PROMPT },
        ...formattedMessages,
      ],
    });

    const responseContent = completion.choices[0]?.message?.content || '';
    const messageId = uuidv4();

    // Send counsellor message
    const counsellorMessage: Message = {
      id: messageId,
      roomId,
      senderId: 'counsellor',
      senderName: 'Counsellor',
      senderRole: 'counsellor',
      content: responseContent,
      timestamp: Date.now(),
    };

    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-stream-end', counsellorMessage);

    // Notify that counsellor stopped typing
    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-typing', {
      isTyping: false,
    });
  } catch (error) {
    console.error('Counsellor response error:', error);
    // Notify that counsellor stopped typing on error
    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-typing', {
      isTyping: false,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, senderId, senderName, senderRole, content, allMessages } = body;

    if (!roomId || !senderId || !senderName || !senderRole || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const message: Message = {
      id: uuidv4(),
      roomId,
      senderId,
      senderName,
      senderRole,
      content,
      timestamp: Date.now(),
    };

    const pusher = getPusherServer();
    await pusher.trigger(`presence-room-${roomId}`, 'new-message', message);

    // Trigger counsellor response asynchronously (don't await)
    const messagesForCounsellor = [...(allMessages || []), message];
    triggerCounsellorResponse(roomId, messagesForCounsellor);

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Message send error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
