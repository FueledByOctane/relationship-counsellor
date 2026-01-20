import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const roomId = generateRoomCode();
    const participantId = uuidv4();

    return NextResponse.json({
      roomId,
      participant: {
        id: participantId,
        name,
        role: 'partner-a',
        isOnline: true,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}
