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
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
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
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isEmpty
                ? 'bg-red-500'
                : isLow
                ? 'bg-amber-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
        <span className={`text-xs ${isEmpty ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
          {remaining}/{limit} left
        </span>
      </div>
      {isEmpty && (
        <span className="text-xs text-red-600 animate-pulse">
          Upgrade for more
        </span>
      )}
    </div>
  );
}
