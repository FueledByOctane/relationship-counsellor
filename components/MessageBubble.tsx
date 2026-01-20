'use client';

import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const isCounsellor = message.senderRole === 'counsellor';

  const getBubbleStyles = () => {
    if (isCounsellor) {
      return 'bg-purple-100 text-purple-900 border border-purple-200';
    }
    if (isOwn) {
      return 'bg-blue-600 text-white';
    }
    return 'bg-gray-100 text-gray-900';
  };

  const getNameColor = () => {
    if (isCounsellor) return 'text-purple-600';
    if (message.senderRole === 'partner-a') return 'text-blue-600';
    return 'text-green-600';
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`flex flex-col ${
        isCounsellor ? 'items-center' : isOwn ? 'items-end' : 'items-start'
      } mb-4`}
    >
      <div
        className={`max-w-[80%] ${isCounsellor ? 'w-full max-w-2xl' : ''}`}
      >
        <div className={`flex items-center gap-2 mb-1 ${isOwn && !isCounsellor ? 'justify-end' : ''}`}>
          <span className={`text-xs font-medium ${getNameColor()}`}>
            {isCounsellor ? '🧠 Counsellor' : message.senderName}
          </span>
          <span className="text-xs text-gray-400">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div
          className={`px-4 py-2 rounded-2xl ${getBubbleStyles()} ${
            isCounsellor ? 'rounded-lg' : ''
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
