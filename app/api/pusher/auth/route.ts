import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getPusherServer } from '@/lib/pusher-server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const socketId = formData.get('socket_id') as string;
    const channelName = formData.get('channel_name') as string;

    const url = new URL(request.url);
    const visitorId = url.searchParams.get('user_id');
    const userName = url.searchParams.get('user_name');
    const userRole = url.searchParams.get('user_role');

    if (!socketId || !channelName) {
      return NextResponse.json(
        { error: 'Missing socket_id or channel_name' },
        { status: 400 }
      );
    }

    const pusher = getPusherServer();

    if (channelName.startsWith('presence-')) {
      if (!visitorId || !userName || !userRole) {
        return NextResponse.json(
          { error: 'Missing user info for presence channel' },
          { status: 400 }
        );
      }

      // Verify isPaid from database - never trust client
      let isPaid = false;
      const { userId: clerkUserId } = await auth();

      if (clerkUserId) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('subscription_tier')
          .eq('clerk_id', clerkUserId)
          .single();

        isPaid = profile?.subscription_tier === 'paid';
      }

      const presenceData = {
        user_id: visitorId,
        user_info: {
          name: userName,
          role: userRole,
          isPaid: isPaid,
        },
      };

      const auth_response = pusher.authorizeChannel(socketId, channelName, presenceData);
      return NextResponse.json(auth_response);
    }

    const auth_response = pusher.authorizeChannel(socketId, channelName);
    return NextResponse.json(auth_response);
  } catch (error) {
    console.error('Pusher auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
