import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, name } = body;

    if (!roomId || typeof roomId !== 'string') {
      return NextResponse.json(
        { error: 'Room ID is required' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const participantId = uuidv4();

    return NextResponse.json({
      roomId: roomId.toUpperCase(),
      participant: {
        id: participantId,
        name,
        role: 'partner-b',
        isOnline: true,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to join room' },
      { status: 500 }
    );
  }
}
