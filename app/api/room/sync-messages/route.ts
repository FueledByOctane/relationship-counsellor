import { NextResponse } from 'next/server';
import { getPusherServer } from '@/lib/pusher-server';
import type { Message } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, senderId, messages } = body;

    if (!roomId || !senderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pusher = getPusherServer();
    await pusher.trigger(`presence-room-${roomId}`, 'sync-messages', {
      senderId,
      messages: messages || [],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Message sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync messages' },
      { status: 500 }
    );
  }
}
