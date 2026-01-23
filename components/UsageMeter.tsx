'use client';

interface UsageMeterProps {
  currentUsage: number;
  limit: number;
  isPaid: boolean;
}

export default function UsageMeter({ currentUsage, limit, isPaid }: UsageMeterProps) {
  if (isPaid) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="bg-[#E8EDE5] text-[#5C6B56] px-2 py-0.5 rounded-full text-xs font-medium">
          Unlimited
        </span>
      </div>
    );
  }

  const remaining = Math.max(0, limit - currentUsage);
  const percentage = (currentUsage / limit) * 100;
  const isLow = remaining <= 2;
  const isEmpty = remaining === 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-[#E8EDE5] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isEmpty
                ? 'bg-[#C4A484]'
                : isLow
                ? 'bg-[#9C8B7A]'
                : 'bg-[#8B9D83]'
            }`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
        <span className={`text-xs ${isEmpty ? 'text-[#9C8B7A] font-medium' : 'text-[#6B6560]'}`}>
          {remaining}/{limit} left
        </span>
      </div>
      {isEmpty && (
        <span className="text-xs text-[#C4A484] animate-pulse">
          Upgrade for more
        </span>
      )}
    </div>
  );
}
