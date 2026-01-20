'use client';

import { useEffect, useState, useRef } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { getPusherClient } from '@/lib/pusher-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import type { Message, PusherMember, Participant } from '@/types';
import type { PresenceChannel } from 'pusher-js';

export default function ChatContainer() {
  const {
    roomId,
    participant,
    partner,
    setPartner,
    addMessage,
    setTyping,
    setCounsellorTyping,
  } = useChatStore();

  const [copied, setCopied] = useState(false);
  const streamingMessageRef = useRef<{ id: string; content: string } | null>(null);
  const partnerRef = useRef<Participant | null>(partner);

  // Keep partner ref updated
  useEffect(() => {
    partnerRef.current = partner;
  }, [partner]);

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

  useEffect(() => {
    if (!roomId || !participant) return;

    const pusher = getPusherClient({
      id: participant.id,
      name: participant.name,
      role: participant.role,
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
          });
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
        });
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
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`presence-room-${roomId}`);
    };
  }, [roomId, participant?.id, participant?.name, participant?.role, setPartner, addMessage, setTyping, setCounsellorTyping]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Relationship Counsellor
            </h1>
            <p className="text-sm text-gray-500">
              Room: <span className="font-mono">{roomId}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
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
            <button
              onClick={copyShareLink}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              {copied ? 'Copied!' : 'Share Link'}
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <MessageInput />
    </div>
  );
}
