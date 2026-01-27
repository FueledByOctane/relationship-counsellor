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
  isPaid: boolean;
  onLimitReached: () => void;
  onUsageUpdated: () => void;
}

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
  const { roomId, participant, partner, messages: allMessages, addMessage, isCounsellorTyping } = useChatStore();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wasCounsellorTypingRef = useRef(false);

  // Auto-focus textarea when counsellor finishes typing
  useEffect(() => {
    if (wasCounsellorTypingRef.current && !isCounsellorTyping) {
      // Counsellor just stopped typing - focus the input
      textareaRef.current?.focus();
    }
    wasCounsellorTypingRef.current = isCounsellorTyping;
  }, [isCounsellorTyping]);

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

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }

    sendTypingStatus(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !roomId || !participant || isSending) return;

    if (!isPaid && usageData && !usageData.canInteract) {
      onLimitReached();
      return;
    }

    setIsSending(true);
    setError(null);
    sendTypingStatus(false);

    try {
      if (!isPaid) {
        const usageResponse = await fetchWithTimeout('/api/usage', { method: 'POST' }, 10000);
        const usageResult = await usageResponse.json();

        if (!usageResult.allowed) {
          onLimitReached();
          setIsSending(false);
          return;
        }
      }

      const messageId = uuidv4();
      const trimmedContent = message.trim();

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

      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      const recentMessages = [...allMessages.slice(-49), optimisticMessage];

      const response = await fetchWithTimeout('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          messageId,
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

  const isLimitReached = !isPaid && usageData?.tier === 'free' && !usageData?.canInteract;

  return (
    <div className="bg-[#FFFCF7] border-t border-[#8B9D83]/15 p-5 relative z-10">
      {error && (
        <div className="max-w-[800px] mx-auto mb-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-500 hover:text-red-700"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {isLimitReached && (
        <div className="max-w-[800px] mx-auto mb-4">
          <div className="p-3 bg-[#C4A484]/10 border border-[#C4A484]/30 rounded-xl text-sm text-[#9C8B7A]">
            You&apos;ve reached your weekly limit of 5 interactions.
            <button
              onClick={onLimitReached}
              className="ml-1 font-medium text-[#9C8B7A] underline hover:no-underline"
            >
              Upgrade to continue
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto">
        <div
          className={`flex items-end gap-4 bg-[#F7F4EE] border-2 rounded-3xl p-2 pl-5 transition-all
            ${isLimitReached ? 'border-[#C4A484]/30' : 'border-[#C4D1BE] focus-within:border-[#8B9D83] focus-within:shadow-[0_4px_20px_-5px_rgba(139,157,131,0.3)]'}`}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={isLimitReached
              ? "Upgrade to continue the conversation..."
              : "Type your message..."}
            className="flex-1 border-none bg-transparent text-[0.95rem] text-[#2C2926] resize-none min-h-[24px] max-h-[120px] py-2 leading-relaxed focus:outline-none placeholder:text-[#9A9590]"
            style={{ fontFamily: 'inherit' }}
            rows={1}
            disabled={isSending || isLimitReached}
          />
          <span className="hidden md:block text-[0.7rem] text-[#9A9590] whitespace-nowrap self-center mr-2">
            Enter to send · Shift+Enter for new line
          </span>
          <button
            type="submit"
            disabled={isSending || !message.trim() || isLimitReached}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex-shrink-0"
          >
            <svg className="w-5 h-5 stroke-white stroke-2 fill-none translate-x-[1px]" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
