'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/stores/chatStore';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function MessageList() {
  const { messages, participant, isTyping, isCounsellorTyping, partner } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isCounsellorTyping]);

  const isPartnerTyping = partner && isTyping[partner.id];

  return (
    <div className="flex-1 overflow-y-auto p-8 relative z-[1]">
      <div className="max-w-[800px] mx-auto flex flex-col gap-5">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full py-20">
            <div className="text-center text-[#6B6560]">
              <p
                className="text-xl mb-3 text-[#3D3531]"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                Welcome to your session
              </p>
              <p className="text-sm max-w-md">
                Start by sharing what&apos;s on your mind. Your counsellor will guide the conversation with gentle, thoughtful questions.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === participant?.id}
          />
        ))}

        {isPartnerTyping && (
          <TypingIndicator name={partner.name} />
        )}

        {isCounsellorTyping && (
          <TypingIndicator name="Counsellor" isCounsellor />
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
