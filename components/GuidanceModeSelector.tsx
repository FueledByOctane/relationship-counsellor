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
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition"
      >
        <span>{currentMode?.label || 'Standard'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
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
                        ? 'bg-purple-50 border border-purple-200'
                        : 'hover:bg-gray-50'
                    } ${isLocked ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isSelected ? 'text-purple-700' : 'text-gray-900'}`}>
                        {mode.label}
                      </span>
                      {isLocked && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          Paid
                        </span>
                      )}
                      {isSelected && !isLocked && (
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{mode.description}</p>
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
