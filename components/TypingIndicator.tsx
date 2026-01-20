'use client';

interface TypingIndicatorProps {
  name: string;
  isCounsellor?: boolean;
}

export default function TypingIndicator({ name, isCounsellor = false }: TypingIndicatorProps) {
  return (
    <div className={`flex ${isCounsellor ? 'justify-center' : 'justify-start'} mb-4`}>
      <div
        className={`px-4 py-2 rounded-2xl ${
          isCounsellor
            ? 'bg-purple-50 border border-purple-200'
            : 'bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isCounsellor ? 'text-purple-600' : 'text-gray-600'}`}>
            {isCounsellor ? '🧠 ' : ''}{name} is typing
          </span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
