'use client';

import { useEffect, useState, useRef } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { useChatStore } from '@/stores/chatStore';
import { getPusherClient } from '@/lib/pusher-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import GuidanceModeSelector from './GuidanceModeSelector';
import UsageMeter from './UsageMeter';
import UpgradePrompt from './UpgradePrompt';
import SessionSummary from './SessionSummary';
import type { Message, PusherMember, Participant } from '@/types';
import type { GuidanceMode } from '@/lib/prompts';
import type { PresenceChannel } from 'pusher-js';
import Link from 'next/link';

interface UsageData {
  tier: 'free' | 'paid';
  weeklyUsageCount: number;
  weeklyLimit: number | null;
  canInteract: boolean;
}

export default function ChatContainer() {
  const { user } = useUser();
  const {
    roomId,
    fieldName,
    participant,
    partner,
    messages,
    setPartner,
    setFieldName,
    addMessage,
    mergeMessages,
    setTyping,
    setCounsellorTyping,
  } = useChatStore();

  const [copied, setCopied] = useState(false);
  const [guidanceMode, setGuidanceMode] = useState<GuidanceMode>('standard');
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [partnerIsPaid, setPartnerIsPaid] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<'limit-reached' | 'feature-locked' | 'general'>('general');
  const streamingMessageRef = useRef<{ id: string; content: string } | null>(null);
  const partnerRef = useRef<Participant | null>(partner);
  const messagesRef = useRef<Message[]>(messages);
  const hasAnnouncedRef = useRef(false);
  const counsellorTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep refs updated
  useEffect(() => {
    partnerRef.current = partner;
  }, [partner]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Broadcast messages to sync with partner
  const broadcastMessages = async () => {
    if (!roomId || !participant || messagesRef.current.length === 0) return;
    try {
      await fetch('/api/room/sync-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          senderId: participant.id,
          messages: messagesRef.current,
        }),
      });
    } catch (error) {
      console.error('Error broadcasting messages:', error);
    }
  };

  // Fetch usage data
  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const response = await fetch('/api/usage');
      if (response.ok) {
        const data = await response.json();
        setUsageData(data);
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?code=${roomId}`
    : '';

  const copyShareLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for non-HTTPS contexts
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // If copy fails, show the URL in a prompt
      window.prompt('Copy this link:', shareUrl);
    }
  };

  // Broadcast room settings to partner
  const broadcastRoomSettings = async (mode?: GuidanceMode, paid?: boolean, name?: string) => {
    if (!roomId || !participant) return;
    try {
      await fetch('/api/room/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          senderId: participant.id,
          guidanceMode: mode,
          isPaid: paid,
          fieldName: name,
        }),
      });
    } catch (error) {
      console.error('Error broadcasting room settings:', error);
    }
  };

  const handleModeChange = (mode: GuidanceMode) => {
    setGuidanceMode(mode);
    // Store mode in localStorage for persistence
    localStorage.setItem(`guidance-mode-${roomId}`, mode);
    // Broadcast to partner
    broadcastRoomSettings(mode, undefined);
  };

  const handleUpgradeClick = (reason: 'limit-reached' | 'feature-locked' | 'general' = 'general') => {
    setUpgradeReason(reason);
    setShowUpgrade(true);
  };

  // Load saved guidance mode
  useEffect(() => {
    if (roomId) {
      const savedMode = localStorage.getItem(`guidance-mode-${roomId}`) as GuidanceMode | null;
      if (savedMode) {
        setGuidanceMode(savedMode);
      }
    }
  }, [roomId]);

  // Track user's paid status for Pusher connection
  // Use a separate state that only changes when paid status actually changes (not on every usage refresh)
  const [pusherPaidStatus, setPusherPaidStatus] = useState<boolean | null>(null);

  useEffect(() => {
    if (usageData !== null) {
      const newPaidStatus = usageData.tier === 'paid';
      if (pusherPaidStatus === null || pusherPaidStatus !== newPaidStatus) {
        setPusherPaidStatus(newPaidStatus);
      }
    }
  }, [usageData, pusherPaidStatus]);

  useEffect(() => {
    // Wait for initial usage data load
    if (!roomId || !participant || pusherPaidStatus === null) return;

    const pusher = getPusherClient({
      id: participant.id,
      name: participant.name,
      role: participant.role,
      isPaid: pusherPaidStatus,
    });

    const channel = pusher.subscribe(`presence-room-${roomId}`) as PresenceChannel;

    channel.bind('pusher:subscription_succeeded', (members: { each: (callback: (member: PusherMember) => void) => void }) => {
      members.each((member: PusherMember) => {
        if (member.id !== participant.id) {
          setPartner({
            id: member.id,
            name: member.info.name,
            role: member.info.role,
            isOnline: true,
            isPaid: member.info.isPaid,
          });
          // Update partner's paid status
          if (member.info.isPaid) {
            setPartnerIsPaid(true);
          }
        }
      });
    });

    channel.bind('pusher:member_added', (member: PusherMember) => {
      if (member.id !== participant.id) {
        setPartner({
          id: member.id,
          name: member.info.name,
          role: member.info.role,
          isOnline: true,
          isPaid: member.info.isPaid,
        });
        // Update partner's paid status
        if (member.info.isPaid) {
          setPartnerIsPaid(true);
        }
        // Sync messages with the joining partner after a short delay
        setTimeout(() => {
          broadcastMessages();
        }, 500);
      }
    });

    channel.bind('pusher:member_removed', (member: PusherMember) => {
      const currentPartner = partnerRef.current;
      if (currentPartner && member.id === currentPartner.id) {
        setPartner({ ...currentPartner, isOnline: false });
      }
    });

    channel.bind('new-message', (message: Message) => {
      addMessage(message);
    });

    channel.bind('user-typing', (data: { senderId: string; isTyping: boolean }) => {
      if (data.senderId !== participant.id) {
        setTyping(data.senderId, data.isTyping);
      }
    });

    channel.bind('counsellor-typing', (data: { isTyping: boolean }) => {
      setCounsellorTyping(data.isTyping);

      // Clear any existing timeout
      if (counsellorTypingTimeoutRef.current) {
        clearTimeout(counsellorTypingTimeoutRef.current);
        counsellorTypingTimeoutRef.current = null;
      }

      // If counsellor starts typing, set a 30-second timeout to auto-clear
      // This prevents the UI from getting stuck if the server times out
      if (data.isTyping) {
        counsellorTypingTimeoutRef.current = setTimeout(() => {
          setCounsellorTyping(false);
          counsellorTypingTimeoutRef.current = null;
        }, 30000);
      }
    });

    channel.bind('counsellor-stream-start', (data: { id: string }) => {
      streamingMessageRef.current = { id: data.id, content: '' };
    });

    channel.bind('counsellor-stream', (data: { id: string; chunk: string }) => {
      if (streamingMessageRef.current && streamingMessageRef.current.id === data.id) {
        streamingMessageRef.current.content += data.chunk;
      }
    });

    channel.bind('counsellor-stream-end', (message: Message) => {
      addMessage(message);
      streamingMessageRef.current = null;
      setCounsellorTyping(false);
      // Clear the typing timeout since we got a response
      if (counsellorTypingTimeoutRef.current) {
        clearTimeout(counsellorTypingTimeoutRef.current);
        counsellorTypingTimeoutRef.current = null;
      }
      // Refresh usage data after counsellor responds
      fetchUsageData();
    });

    // Listen for room settings from partner
    channel.bind('room-settings', (data: { senderId: string; guidanceMode?: GuidanceMode; isPaid?: boolean; fieldName?: string }) => {
      if (data.senderId !== participant.id) {
        // Update guidance mode if partner changed it
        if (data.guidanceMode) {
          setGuidanceMode(data.guidanceMode);
          localStorage.setItem(`guidance-mode-${roomId}`, data.guidanceMode);
        }
        // Update partner's premium status
        if (typeof data.isPaid === 'boolean') {
          setPartnerIsPaid(data.isPaid);
        }
        // Update field name if partner has it
        if (data.fieldName && !fieldName) {
          setFieldName(data.fieldName);
        }
      }
    });

    // Listen for message sync from partner
    channel.bind('sync-messages', (data: { senderId: string; messages: Message[] }) => {
      if (data.senderId !== participant.id && data.messages?.length > 0) {
        mergeMessages(data.messages);
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`presence-room-${roomId}`);
      // Clean up typing timeout
      if (counsellorTypingTimeoutRef.current) {
        clearTimeout(counsellorTypingTimeoutRef.current);
        counsellorTypingTimeoutRef.current = null;
      }
    };
  }, [roomId, participant?.id, participant?.name, participant?.role, pusherPaidStatus, setPartner, addMessage, mergeMessages, setTyping, setCounsellorTyping]);

  // Either partner being premium unlocks features for both
  const userIsPaid = usageData?.tier === 'paid';
  const isPaid = userIsPaid || partnerIsPaid;

  // Broadcast room settings when we first join (so partner gets our current mode and field name)
  useEffect(() => {
    if (usageData && roomId && participant && partner?.isOnline && !hasAnnouncedRef.current) {
      hasAnnouncedRef.current = true;
      // Small delay to ensure Pusher connection is established
      const timer = setTimeout(() => {
        broadcastRoomSettings(guidanceMode, undefined, fieldName || undefined);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [usageData, roomId, participant?.id, partner?.isOnline, fieldName]);

  return (
    <div className="flex flex-col h-screen bg-[#F7F4EE] overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="texture-overlay" />

      {/* Header */}
      <header className="bg-[#FFFCF7] border-b border-[#8B9D83]/15 px-4 md:px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left: Back button and session info */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-[#E8EDE5] hover:bg-[#C4D1BE] flex items-center justify-center transition-all hover:-translate-x-0.5"
              title="Back to home"
            >
              <svg className="w-[18px] h-[18px] stroke-[#5C6B56] stroke-2 fill-none" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
            <div>
              <h1
                className="text-xl font-medium text-[#3D3531] leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                {fieldName || 'Meet In The Field'}
              </h1>
              <p className="text-xs text-[#6B6560] tracking-wide mt-0.5">
                Field: <span className="font-mono bg-[#E8EDE5] text-[#5C6B56] px-2 py-0.5 rounded">{roomId}</span>
              </p>
            </div>
          </div>

          {/* Center: Guidance mode (hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <GuidanceModeSelector
              selectedMode={guidanceMode}
              onModeChange={handleModeChange}
              isPaid={isPaid}
              onUpgradeClick={() => handleUpgradeClick('feature-locked')}
            />
          </div>

          {/* Right: Status and actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Partner Status */}
            <div className="flex items-center gap-2 text-sm text-[#6B6560]">
              <span
                className={`w-2 h-2 rounded-full ${
                  partner?.isOnline ? 'bg-[#8B9D83]' : 'bg-[#C4A484] animate-pulse'
                }`}
              />
              <span className="hidden sm:inline">
                {partner ? (partner.isOnline ? partner.name : `${partner.name} (offline)`) : 'Waiting for partner...'}
              </span>
            </div>

            {/* Share Link - only show when waiting for partner */}
            {!partner?.isOnline && (
              <button
                onClick={copyShareLink}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wide bg-[#8B9D83] text-white rounded-[20px] hover:bg-[#5C6B56] transition-all hover:-translate-y-0.5"
              >
                {copied ? 'Copied!' : 'Share Link'}
              </button>
            )}

            {/* Session Summary */}
            <SessionSummary
              messages={messages}
              isPaid={isPaid}
              roomId={roomId || ''}
              onUpgradeClick={() => handleUpgradeClick('feature-locked')}
            />

            {/* Support Link */}
            <Link
              href="/support"
              className="w-9 h-9 rounded-full bg-[#E8EDE5] hover:bg-[#C4D1BE] flex items-center justify-center transition-all"
              title="Get support"
            >
              <svg className="w-[18px] h-[18px] stroke-[#5C6B56] stroke-2 fill-none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </Link>

            {/* User Button */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Mobile guidance mode */}
        <div className="lg:hidden mt-3 pt-3 border-t border-[#8B9D83]/10">
          <GuidanceModeSelector
            selectedMode={guidanceMode}
            onModeChange={handleModeChange}
            isPaid={isPaid}
            onUpgradeClick={() => handleUpgradeClick('feature-locked')}
          />
        </div>
      </header>

      {/* Messages */}
      <MessageList />

      {/* Input - Pass usage data and shared premium status to check limits */}
      <MessageInput
        guidanceMode={guidanceMode}
        usageData={usageData}
        isPaid={isPaid}
        onLimitReached={() => handleUpgradeClick('limit-reached')}
        onUsageUpdated={fetchUsageData}
      />

      {/* Upgrade Prompt Modal */}
      <UpgradePrompt
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        reason={upgradeReason}
      />
    </div>
  );
}
