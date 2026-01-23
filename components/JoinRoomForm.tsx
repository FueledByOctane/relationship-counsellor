'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useChatStore } from '@/stores/chatStore';

export default function JoinRoomForm() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setRoomId, setParticipant, setFieldName, clearMessages, loadRoomMessages } = useChatStore();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setRoomCode(code.toUpperCase());
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!roomCode.trim()) {
      setError('Please enter a field code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Clear messages only - we'll load room-specific messages after
      clearMessages();

      const response = await fetch('/api/room/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          roomId: roomCode.trim().toUpperCase()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join field');
      }

      setRoomId(data.roomId);
      setParticipant(data.participant);
      // Set field name from API response
      setFieldName(data.field?.name || null);
      // Load existing messages for this room
      loadRoomMessages(data.roomId);
      router.push(`/room/${data.roomId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="join-name" className="block text-sm font-medium text-[#3D3531] mb-1.5">
          Your Name
        </label>
        <input
          id="join-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 bg-[#F7F4EE] border border-[#8B9D83]/20 rounded-xl focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-[#8B9D83] outline-none transition text-[#2C2926] placeholder:text-[#6B6560]/50"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="field-code" className="block text-sm font-medium text-[#3D3531] mb-1.5">
          Field Code
        </label>
        <input
          id="field-code"
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          placeholder="Enter 6-character code"
          maxLength={6}
          className="w-full px-4 py-3 bg-[#F7F4EE] border border-[#8B9D83]/20 rounded-xl focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-[#8B9D83] outline-none transition text-[#2C2926] placeholder:text-[#6B6560]/50 uppercase tracking-widest text-center font-mono"
          disabled={isLoading}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#8B9D83] to-[#5C6B56] text-white font-medium rounded-xl hover:from-[#7A8C74] hover:to-[#4B5A47] focus:ring-2 focus:ring-[#8B9D83]/50 focus:ring-offset-2 focus:ring-offset-[#FFFCF7] disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2"
      >
        {isLoading ? 'Joining...' : (
          <>
            Enter Field
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
