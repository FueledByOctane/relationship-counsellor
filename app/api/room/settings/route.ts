import { NextResponse } from 'next/server';
import { getPusherServer } from '@/lib/pusher-server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, senderId, guidanceMode, isPaid } = body;

    if (!roomId || !senderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pusher = getPusherServer();
    await pusher.trigger(`presence-room-${roomId}`, 'room-settings', {
      senderId,
      guidanceMode,
      isPaid,
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
