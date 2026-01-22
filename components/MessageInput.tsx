'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import type { GuidanceMode } from '@/lib/prompts';
import { v4 as uuidv4 } from 'uuid';

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

// Helper to create fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 30000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
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
  const [error, setError] = useState<string | null>(null);
  const { roomId, participant, partner, messages: allMessages, addMessage } = useChatStore();
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
    setError(null);
    sendTypingStatus(false);

    try {
      // Increment usage for tracking (only for non-premium rooms)
      if (!isPaid) {
        const usageResponse = await fetchWithTimeout('/api/usage', { method: 'POST' }, 10000);
        const usageResult = await usageResponse.json();

        if (!usageResult.allowed) {
          onLimitReached();
          setIsSending(false);
          return;
        }
      }

      // Generate message ID client-side for optimistic update
      const messageId = uuidv4();
      const trimmedContent = message.trim();

      // Optimistic update: add message to local state immediately
      const optimisticMessage = {
        id: messageId,
        roomId,
        senderId: participant.id,
        senderName: participant.name,
        senderRole: participant.role,
        content: trimmedContent,
        timestamp: Date.now(),
      };
      addMessage(optimisticMessage);

      // Clear message input immediately for better UX
      setMessage('');

      // Limit message history to last 50 messages to prevent large payloads
      const recentMessages = [...allMessages.slice(-49), optimisticMessage];

      const response = await fetchWithTimeout('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          messageId, // Pass the ID so server uses the same one
          senderId: participant.id,
          senderName: participant.name,
          senderRole: participant.role,
          content: trimmedContent,
          allMessages: recentMessages,
          guidanceMode,
          partnerName: partner?.name,
        }),
      }, 30000);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      setError(null);
      onUsageUpdated();
    } catch (err) {
      console.error('Error sending message:', err);
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else if (err.message.includes('load failed') || err.message.includes('Failed to fetch')) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(err.message || 'Failed to send message. Please try again.');
        }
      } else {
        setError('Failed to send message. Please try again.');
      }
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
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}
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
