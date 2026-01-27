import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getPusherServer } from '@/lib/pusher-server';
import { getSupabaseAdmin } from '@/lib/supabase';

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
    const { roomId, senderId, guidanceMode, fieldName } = body;

    if (!roomId || !senderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get isPaid from database - never trust client
    let isPaid = false;
    const supabaseAdmin = getSupabaseAdmin();
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('subscription_tier')
      .eq('clerk_id', clerkUserId)
      .single();

    isPaid = profile?.subscription_tier === 'paid';

    const pusher = getPusherServer();
    await pusher.trigger(`presence-room-${roomId}`, 'room-settings', {
      senderId,
      guidanceMode,
      isPaid,
      fieldName,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Room settings broadcast error:', error);
    return NextResponse.json(
      { error: 'Failed to broadcast room settings' },
      { status: 500 }
    );
  }
}
