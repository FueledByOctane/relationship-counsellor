'use client';

import { useState } from 'react';
import type { Message } from '@/types';

interface SessionSummaryProps {
  messages: Message[];
  isPaid: boolean;
  roomId: string;
  onUpgradeClick: () => void;
}

export default function SessionSummary({ messages, isPaid, roomId, onUpgradeClick }: SessionSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateSummary = async () => {
    if (!isPaid) {
      onUpgradeClick();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/session/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, roomId }),
      });

      const data = await response.json();

      if (data.summary) {
        setSummary(data.summary);
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show if there are enough messages
  if (messages.length < 6) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleGenerateSummary}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#E8EDE5] hover:bg-[#C4D1BE] text-[#5C6B56] rounded-[20px] transition disabled:opacity-50"
        title={isPaid ? 'Generate session summary' : 'Upgrade to generate summaries'}
      >
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        <span>Summary</span>
        {!isPaid && (
          <span className="text-xs bg-[#C4A484]/20 text-[#9C8B7A] px-1.5 py-0.5 rounded-full">Premium</span>
        )}
      </button>

      {/* Summary Modal */}
      {isOpen && summary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-[#FFFCF7] rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-[#8B9D83]/20">
            <div className="flex items-center justify-between p-4 border-b border-[#8B9D83]/15">
              <h2 className="text-lg font-semibold text-[#3D3531]" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>Session Summary</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#6B6560] hover:text-[#3D3531]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm max-w-none text-[#2C2926]">
                {summary.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-[#3D3531]" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>{paragraph.replace('## ', '')}</h3>;
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h4 key={index} className="font-semibold mt-3 mb-1 text-[#5C6B56]">{paragraph.replace(/\*\*/g, '')}</h4>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={index} className="ml-4 text-[#6B6560]">{paragraph.replace('- ', '')}</li>;
                  }
                  if (paragraph.trim()) {
                    return <p key={index} className="mb-2 text-[#6B6560]">{paragraph}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
            <div className="p-4 border-t border-[#8B9D83]/15 bg-[#F7F4EE]">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(summary);
                }}
                className="px-4 py-2 text-sm bg-[#E8EDE5] hover:bg-[#C4D1BE] text-[#5C6B56] rounded-[20px] transition"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
