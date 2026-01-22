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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 overflow-visible relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              title="Back to home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {fieldName || 'Meet In The Field'}
              </h1>
              <p className="text-sm text-gray-500">
                Field: <span className="font-mono">{roomId}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Usage Meter */}
            {usageData && (
              <UsageMeter
                currentUsage={usageData.weeklyUsageCount}
                limit={usageData.weeklyLimit || 5}
                isPaid={isPaid}
              />
            )}

            {/* Partner Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  partner?.isOnline ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span className="text-sm text-gray-600">
                {partner ? (partner.isOnline ? partner.name : `${partner.name} (offline)`) : 'Waiting for partner...'}
              </span>
            </div>

            {/* Share Link - only show when waiting for partner */}
            {!partner?.isOnline && (
              <button
                onClick={copyShareLink}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                {copied ? 'Copied!' : 'Share Link'}
              </button>
            )}

            {/* Account Link */}
            <Link
              href="/account"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Account
            </Link>

            {/* User Button */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Secondary toolbar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <GuidanceModeSelector
            selectedMode={guidanceMode}
            onModeChange={handleModeChange}
            isPaid={isPaid}
            onUpgradeClick={() => handleUpgradeClick('feature-locked')}
          />

          <SessionSummary
            messages={messages}
            isPaid={isPaid}
            roomId={roomId || ''}
            onUpgradeClick={() => handleUpgradeClick('feature-locked')}
          />
        </div>
      </div>

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
