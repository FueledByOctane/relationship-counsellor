'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useChatStore } from '@/stores/chatStore';
import ChatContainer from '@/components/ChatContainer';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const { roomId, participant, setRoomId, setMessages, _hasHydrated } = useChatStore();

  useEffect(() => {
    if (!_hasHydrated) return;

    const urlRoomId = params.roomId as string;

    // If no participant is set, redirect to home
    if (!participant) {
      router.push(`/?code=${urlRoomId}`);
      return;
    }

    // If joining a different room, clear old messages and update room ID
    if (urlRoomId && roomId !== urlRoomId) {
      setMessages([]); // Clear messages from previous room
      setRoomId(urlRoomId);
    }
  }, [_hasHydrated, participant, roomId, params.roomId, router, setRoomId, setMessages]);

  // Show loading state while hydrating or checking auth
  if (!_hasHydrated || !participant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <ChatContainer />;
}
