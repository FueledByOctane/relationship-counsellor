import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getPusherServer } from '@/lib/pusher-server';
import { createOpenAIClient } from '@/lib/openai';
import { COUNSELLOR_PROMPTS, type GuidanceMode } from '@/lib/prompts';
import { getSupabaseAdmin, shouldResetWeeklyUsage, resetWeeklyUsage } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from '@/types';

const FREE_TIER_WEEKLY_LIMIT = 5;

async function triggerCounsellorResponse(
  roomId: string,
  allMessages: Message[],
  guidanceMode: GuidanceMode = 'standard',
  partnerAName?: string,
  partnerBName?: string
) {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) return;

  const pusher = getPusherServer();
  const openai = createOpenAIClient(openAiKey);

  try {
    // Notify that counsellor is typing
    await pusher.trigger(`presence-room-${roomId}`, 'counsellor-typing', {
      isTyping: true,
    });

    // Extract partner names from messages if not provided
    if (!partnerAName || !partnerBName) {
      const partnerAMsg = allMessages.find(m => m.senderRole === 'partner-a');
      const partnerBMsg = allMessages.find(m => m.senderRole === 'partner-b');
      partnerAName = partnerAMsg?.senderName || 'Partner A';
      partnerBName = partnerBMsg?.senderName || 'Partner B';
    }

    // Get the appropriate system prompt based on guidance mode
    let systemPrompt = COUNSELLOR_PROMPTS[guidanceMode] || COUNSELLOR_PROMPTS.standard;

    // Replace placeholders with actual names
    // Add context about who is who at the start of the prompt
    const nameContext = `\n\nParticipants in this session:\n- ${partnerAName} (Partner A)\n- ${partnerBName} (Partner B)\n\nUse their actual names when addressing them, never "[Name]" or "[Partner]".`;
    systemPrompt = systemPrompt + nameContext;

    // Format messages for OpenAI
    const formattedMessages = allMessages.map((msg: Message) => ({
      role: msg.senderRole === 'counsellor' ? 'assistant' as const : 'user' as const,
      content: msg.senderRole === 'counsellor' ? msg.content : `[${msg.senderName}]: ${msg.content}`,
    }));

    // Get response from OpenAI with 25-second timeout
    // This ensures we fail gracefully before Vercel's serverless timeout
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...formattedMessages,
      ],
    }, {
      timeout: 25000,
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
    // Require authentication
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { roomId, messageId, senderId, senderName, senderRole, content, allMessages, guidanceMode, partnerName } = body;

    if (!roomId || !senderId || !senderName || !senderRole || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check usage limits before allowing message
    const supabaseAdmin = getSupabaseAdmin();
    let { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('clerk_id', clerkUserId)
      .single();

    // Auto-create profile if it doesn't exist
    if (!profile) {
      const { data: newProfile } = await supabaseAdmin
        .from('profiles')
        .insert({ clerk_id: clerkUserId })
        .select()
        .single();
      profile = newProfile;
    }

    if (profile) {
      // Check if weekly reset is needed
      if (shouldResetWeeklyUsage(profile.weekly_usage_reset_at)) {
        await resetWeeklyUsage(profile.id);
        profile.weekly_usage_count = 0;
      }

      // Check usage limit for free tier
      const isPaid = profile.subscription_tier === 'paid';
      if (!isPaid && profile.weekly_usage_count >= FREE_TIER_WEEKLY_LIMIT) {
        return NextResponse.json(
          { error: 'Weekly limit reached. Upgrade to continue.', limitReached: true },
          { status: 403 }
        );
      }

      // Increment usage count
      await supabaseAdmin
        .from('profiles')
        .update({ weekly_usage_count: profile.weekly_usage_count + 1 })
        .eq('id', profile.id);
    }

    const message: Message = {
      id: messageId || uuidv4(), // Use client-provided ID if available for consistency
      roomId,
      senderId,
      senderName,
      senderRole,
      content,
      timestamp: Date.now(),
    };

    const pusher = getPusherServer();
    await pusher.trigger(`presence-room-${roomId}`, 'new-message', message);

    // Determine partner names based on who sent this message
    const partnerAName = senderRole === 'partner-a' ? senderName : partnerName;
    const partnerBName = senderRole === 'partner-b' ? senderName : partnerName;

    // Send success response for the message first
    // Then trigger counsellor response - must await on serverless (Vercel kills the function otherwise)
    const messagesForCounsellor = [...(allMessages || []), message];
    await triggerCounsellorResponse(roomId, messagesForCounsellor, guidanceMode || 'standard', partnerAName, partnerBName);

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Message send error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
