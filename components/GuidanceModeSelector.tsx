'use client';

import { useState } from 'react';
import { GUIDANCE_MODES, type GuidanceMode } from '@/lib/prompts';

interface GuidanceModeSelectorProps {
  selectedMode: GuidanceMode;
  onModeChange: (mode: GuidanceMode) => void;
  isPaid: boolean;
  onUpgradeClick: () => void;
}

export default function GuidanceModeSelector({
  selectedMode,
  onModeChange,
  isPaid,
  onUpgradeClick,
}: GuidanceModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentMode = GUIDANCE_MODES.find(m => m.value === selectedMode);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-[#E8EDE5] hover:bg-[#C4D1BE] text-[#5C6B56] border border-[#C4D1BE] rounded-[20px] transition-all font-medium"
      >
        <span>{currentMode?.label || 'Standard'}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 w-72 bg-[#FFFCF7] rounded-xl shadow-lg border border-[#8B9D83]/20 z-20 overflow-hidden">
            <div className="p-2">
              {GUIDANCE_MODES.map((mode) => {
                const isLocked = mode.isPaid && !isPaid;
                const isSelected = selectedMode === mode.value;

                return (
                  <button
                    key={mode.value}
                    onClick={() => {
                      if (isLocked) {
                        onUpgradeClick();
                      } else {
                        onModeChange(mode.value);
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      isSelected
                        ? 'bg-[#E8EDE5] border border-[#C4D1BE]'
                        : 'hover:bg-[#F7F4EE]'
                    } ${isLocked ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isSelected ? 'text-[#5C6B56]' : 'text-[#3D3531]'}`}>
                        {mode.label}
                      </span>
                      {isLocked && (
                        <span className="text-xs bg-[#C4A484]/20 text-[#9C8B7A] px-2 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                      {isSelected && !isLocked && (
                        <svg className="w-5 h-5 text-[#8B9D83]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-[#6B6560] mt-1">{mode.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
