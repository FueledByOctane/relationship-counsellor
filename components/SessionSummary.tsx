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
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition disabled:opacity-50"
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
          <span className="text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full">Paid</span>
        )}
      </button>

      {/* Summary Modal */}
      {isOpen && summary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Session Summary</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm max-w-none">
                {summary.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{paragraph.replace('## ', '')}</h3>;
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h4 key={index} className="font-semibold mt-3 mb-1">{paragraph.replace(/\*\*/g, '')}</h4>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
                  }
                  if (paragraph.trim()) {
                    return <p key={index} className="mb-2">{paragraph}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(summary);
                }}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
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
