import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getPusherServer } from '@/lib/pusher-server';

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
    const { roomId, senderId, senderName, isTyping } = body;

    if (!roomId || !senderId || !senderName || typeof isTyping !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pusher = getPusherServer();
    await pusher.trigger(`presence-room-${roomId}`, 'user-typing', {
      senderId,
      senderName,
      isTyping,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Typing status error:', error);
    return NextResponse.json(
      { error: 'Failed to send typing status' },
      { status: 500 }
    );
  }
}
