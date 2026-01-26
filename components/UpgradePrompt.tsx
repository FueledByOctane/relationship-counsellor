'use client';

import { useState, useEffect } from 'react';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'limit-reached' | 'feature-locked' | 'general';
}

export default function UpgradePrompt({ isOpen, onClose, reason = 'general' }: UpgradePromptProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUK, setIsUK] = useState(false);

  useEffect(() => {
    const browserLocale = navigator.language;
    setIsUK(browserLocale === 'en-GB');
  }, []);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'checkout' }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      setIsLoading(false);
    }
  };

  const titles = {
    'limit-reached': "You've reached your weekly limit",
    'feature-locked': 'Unlock this feature',
    'general': 'Upgrade to Premium',
  };

  const messages = {
    'limit-reached': 'Free users get 5 counsellor interactions per week. Upgrade to continue your session without interruption.',
    'feature-locked': 'This feature is available for premium subscribers. Upgrade to unlock all guidance modes and features.',
    'general': 'Get unlimited interactions, advanced guidance modes, and session summaries.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#FFFCF7] rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#8B9D83]/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B6560] hover:text-[#3D3531]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#E8EDE5] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#8B9D83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2
            className="text-xl font-bold text-[#3D3531] mb-2"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            {titles[reason]}
          </h2>
          <p className="text-[#6B6560]">{messages[reason]}</p>
        </div>

        <div className="bg-gradient-to-br from-[#E8EDE5] to-[#F7F4EE] rounded-xl p-4 mb-6 border border-[#C4D1BE]">
          <div className="flex items-baseline justify-center mb-4">
            <span className="text-3xl font-bold text-[#3D3531]">{isUK ? '£9.99' : '$9.99'}</span>
            <span className="text-[#6B6560] ml-1">/month</span>
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[#3D3531]">Unlimited counsellor interactions</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[#3D3531]">Advanced guidance modes (Conflict Resolution, Intimacy Building, Future Planning)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[#3D3531]">Session summary reports</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[#3D3531]">Personalized prompts based on your goals</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8E75] hover:to-[#4D5C48] text-white font-semibold rounded-[20px] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]"
          >
            {isLoading ? 'Loading...' : 'Upgrade Now'}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-[#6B6560] hover:text-[#3D3531] text-sm"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
