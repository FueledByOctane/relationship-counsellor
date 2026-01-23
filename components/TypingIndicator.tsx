'use client';

interface TypingIndicatorProps {
  name: string;
  isCounsellor?: boolean;
}

export default function TypingIndicator({ name, isCounsellor = false }: TypingIndicatorProps) {
  return (
    <div className={`flex ${isCounsellor ? 'justify-center' : 'justify-start'}`}>
      <div className="flex items-center gap-2 text-[#6B6560] text-sm">
        <div className="flex gap-[3px]">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#8B9D83] animate-[typingBounce_1.4s_ease-in-out_infinite]"
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#8B9D83] animate-[typingBounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: '0.2s' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#8B9D83] animate-[typingBounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
        <span>
          {isCounsellor ? '🌿 ' : ''}{name} is typing...
        </span>
      </div>
    </div>
  );
}
