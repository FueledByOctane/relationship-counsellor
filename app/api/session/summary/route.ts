import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { createOpenAIClient } from '@/lib/openai';
import { SESSION_SUMMARY_PROMPT } from '@/lib/prompts';
import type { Message } from '@/types';

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Check if user is paid
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('subscription_tier, id')
    .eq('clerk_id', userId)
    .single();

  if (!profile || profile.subscription_tier !== 'paid') {
    return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 });
  }

  const body = await req.json();
  const { messages, roomId } = body as { messages: Message[]; roomId: string };

  if (!messages || messages.length < 6) {
    return NextResponse.json({ error: 'Not enough messages for summary' }, { status: 400 });
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    return NextResponse.json({ error: 'OpenAI not configured' }, { status: 500 });
  }

  try {
    const openai = createOpenAIClient(openAiKey);

    // Format transcript
    const transcript = messages
      .map((msg) => {
        const role = msg.senderRole === 'counsellor' ? 'Counsellor' : msg.senderName;
        return `${role}: ${msg.content}`;
      })
      .join('\n\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SESSION_SUMMARY_PROMPT },
        { role: 'user', content: `Here is the session transcript:\n\n${transcript}` },
      ],
      max_tokens: 1000,
    }, {
      timeout: 25000,
    });

    const summary = completion.choices[0]?.message?.content || '';

    // Save session to database
    await supabaseAdmin.from('sessions').insert({
      profile_id: profile.id,
      room_id: roomId,
      messages: messages,
      summary: summary,
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
