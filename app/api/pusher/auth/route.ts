import { NextResponse } from 'next/server';
import { getPusherServer } from '@/lib/pusher-server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const socketId = formData.get('socket_id') as string;
    const channelName = formData.get('channel_name') as string;

    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    const userName = url.searchParams.get('user_name');
    const userRole = url.searchParams.get('user_role');
    const isPaid = url.searchParams.get('is_paid') === 'true';

    if (!socketId || !channelName) {
      return NextResponse.json(
        { error: 'Missing socket_id or channel_name' },
        { status: 400 }
      );
    }

    const pusher = getPusherServer();

    if (channelName.startsWith('presence-')) {
      if (!userId || !userName || !userRole) {
        return NextResponse.json(
          { error: 'Missing user info for presence channel' },
          { status: 400 }
        );
      }

      const presenceData = {
        user_id: userId,
        user_info: {
          name: userName,
          role: userRole,
          isPaid: isPaid,
        },
      };

      const auth = pusher.authorizeChannel(socketId, channelName, presenceData);
      return NextResponse.json(auth);
    }

    const auth = pusher.authorizeChannel(socketId, channelName);
    return NextResponse.json(auth);
  } catch (error) {
    console.error('Pusher auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
