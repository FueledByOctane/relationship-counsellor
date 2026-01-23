'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/stores/chatStore';

export default function CreateRoomForm() {
  const [name, setName] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setRoomId, setParticipant, setFieldName: setStoreFieldName, clearMessages } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Clear any existing messages from previous sessions
      clearMessages();

      const response = await fetch('/api/room/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          fieldName: fieldName.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create field');
      }

      setRoomId(data.roomId);
      setParticipant(data.participant);
      setStoreFieldName(data.fieldName || null);
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
        <label htmlFor="create-name" className="block text-sm font-medium text-[#3D3531] mb-1.5">
          Your Name
        </label>
        <input
          id="create-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 bg-white border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-[#8B9D83] outline-none transition text-[#2C2926] placeholder:text-[#6B6560]/60"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="field-name" className="block text-sm font-medium text-[#3D3531] mb-1.5">
          Field Name <span className="text-[#6B6560] font-normal">(optional)</span>
        </label>
        <input
          id="field-name"
          type="text"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          placeholder="e.g., Our Weekly Check-in"
          className="w-full px-4 py-3 bg-white border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-[#8B9D83] outline-none transition text-[#2C2926] placeholder:text-[#6B6560]/60"
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
        {isLoading ? 'Creating...' : (
          <>
            Start Session
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
