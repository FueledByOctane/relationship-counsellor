'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import type { GuidanceMode } from '@/lib/prompts';

interface UsageData {
  tier: 'free' | 'paid';
  weeklyUsageCount: number;
  weeklyLimit: number | null;
  canInteract: boolean;
}

interface MessageInputProps {
  guidanceMode: GuidanceMode;
  usageData: UsageData | null;
  isPaid: boolean; // Combined status: true if either partner has premium
  onLimitReached: () => void;
  onUsageUpdated: () => void;
}

export default function MessageInput({
  guidanceMode,
  usageData,
  isPaid,
  onLimitReached,
  onUsageUpdated,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { roomId, participant, partner, messages: allMessages } = useChatStore();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  const sendTypingStatus = useCallback((typing: boolean) => {
    if (!roomId || !participant || isTypingRef.current === typing) return;
    isTypingRef.current = typing;

    fetch('/api/typing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId,
        senderId: participant.id,
        senderName: participant.name,
        isTyping: typing,
      }),
    }).catch(console.error);
  }, [roomId, participant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Send typing indicator
    sendTypingStatus(true);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !roomId || !participant || isSending) return;

    // Check usage limits - skip if either partner has premium (isPaid includes partner's status)
    if (!isPaid && usageData && !usageData.canInteract) {
      onLimitReached();
      return;
    }

    setIsSending(true);
    sendTypingStatus(false);

    try {
      // Increment usage for tracking (only for non-premium rooms)
      if (!isPaid) {
        const usageResponse = await fetch('/api/usage', { method: 'POST' });
        const usageResult = await usageResponse.json();

        if (!usageResult.allowed) {
          onLimitReached();
          setIsSending(false);
          return;
        }
      }

      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          senderId: participant.id,
          senderName: participant.name,
          senderRole: participant.role,
          content: message.trim(),
          allMessages,
          guidanceMode,
          partnerName: partner?.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessage('');
      onUsageUpdated();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Only show limit reached if not in a premium room (isPaid includes partner's status)
  const isLimitReached = !isPaid && usageData?.tier === 'free' && !usageData?.canInteract;

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      {isLimitReached && (
        <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
          You&apos;ve reached your weekly limit of 5 interactions.
          <button
            onClick={onLimitReached}
            className="ml-1 font-medium text-amber-800 underline hover:no-underline"
          >
            Upgrade to continue
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isLimitReached
            ? "Upgrade to continue the conversation..."
            : "Type your message... (Enter to send, Shift+Enter for new line)"}
          className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
            isLimitReached ? 'border-amber-300 bg-amber-50' : 'border-gray-300'
          }`}
          rows={2}
          disabled={isSending || isLimitReached}
        />
        <button
          type="submit"
          disabled={isSending || !message.trim() || isLimitReached}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition self-end"
        >
          Send
        </button>
      </form>
    </div>
  );
}
