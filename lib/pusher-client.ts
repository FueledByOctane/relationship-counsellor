'use client';

import PusherClient from 'pusher-js';

let pusherClientInstance: PusherClient | null = null;
let currentAuthParams: string | null = null;

interface UserInfo {
  id: string;
  name: string;
  role: string;
}

export function getPusherClient(userInfo?: UserInfo): PusherClient {
  const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!pusherKey || !pusherCluster) {
    throw new Error(
      'Pusher configuration missing. Please ensure NEXT_PUBLIC_PUSHER_KEY and NEXT_PUBLIC_PUSHER_CLUSTER are set in .env.local'
    );
  }

  const authParams = userInfo
    ? `user_id=${userInfo.id}&user_name=${encodeURIComponent(userInfo.name)}&user_role=${userInfo.role}`
    : '';

  // If user info changed, create a new instance
  if (pusherClientInstance && currentAuthParams !== authParams) {
    pusherClientInstance.disconnect();
    pusherClientInstance = null;
  }

  if (!pusherClientInstance) {
    currentAuthParams = authParams;
    pusherClientInstance = new PusherClient(pusherKey, {
      cluster: pusherCluster,
      authEndpoint: `/api/pusher/auth${authParams ? `?${authParams}` : ''}`,
    });
  }
  return pusherClientInstance;
}

export function disconnectPusher(): void {
  if (pusherClientInstance) {
    pusherClientInstance.disconnect();
    pusherClientInstance = null;
    currentAuthParams = null;
  }
}
