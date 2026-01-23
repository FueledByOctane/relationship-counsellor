'use client';

import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const isCounsellor = message.senderRole === 'counsellor';
  const isPartnerA = message.senderRole === 'partner-a';

  const getBubbleStyles = () => {
    if (isCounsellor) {
      return 'bg-[#F5EEF3] text-[#3D3531] border border-[#A68B9C]/20 rounded-[20px] text-center italic';
    }
    if (isOwn) {
      // Current user - gradient brown/earth tones, right-aligned
      return 'bg-gradient-to-br from-[#9E8A7A] to-[#9C8B7A] text-white rounded-br-[6px] shadow-[0_4px_15px_-5px_rgba(158,138,122,0.4)]';
    }
    // Partner - light green, left-aligned
    return 'bg-[#E5EDE6] text-[#3D3531] border border-[#7A9E7E]/20 rounded-bl-[6px]';
  };

  const getNameColor = () => {
    if (isCounsellor) return 'text-[#A68B9C]';
    if (isOwn) return 'text-[#9E8A7A]';
    return 'text-[#7A9E7E]';
  };

  const getAlignment = () => {
    if (isCounsellor) return 'items-center self-center';
    if (isOwn) return 'items-end self-end';
    return 'items-start self-start';
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`flex flex-col ${getAlignment()} animate-[messageIn_0.4s_ease-out]`}
      style={{ maxWidth: isCounsellor ? '85%' : '70%' }}
    >
      <div className={`flex items-center gap-2 mb-1 ${isOwn && !isCounsellor ? 'flex-row-reverse' : ''}`}>
        <span className={`text-xs font-semibold tracking-wide ${getNameColor()}`}>
          {isCounsellor ? (
            <span className="flex items-center gap-1">
              <span>🌿</span>
              Counsellor
            </span>
          ) : message.senderName}
        </span>
        <span className="text-xs text-[#9A9590]">
          {formatTime(message.timestamp)}
        </span>
      </div>
      <div
        className={`px-5 py-3.5 rounded-[20px] leading-relaxed ${getBubbleStyles()}`}
        style={{
          fontFamily: isCounsellor ? 'var(--font-cormorant), Cormorant Garamond, serif' : 'inherit',
          fontSize: isCounsellor ? '1.05rem' : '0.95rem'
        }}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}
