'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/stores/chatStore';

interface Field {
  id: string;
  code: string;
  name: string;
  role: 'partner-a' | 'partner-b';
  partnerName: string | null;
  yourName: string;
  guidanceMode: string;
  lastActivityAt: string;
  createdAt: string;
  isCreator: boolean;
}

export default function MyFields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const { setRoomId, setParticipant, setFieldName, clearMessages, loadRoomMessages } = useChatStore();

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await fetch('/api/fields');
      if (response.ok) {
        const data = await response.json();
        setFields(data.fields || []);
      }
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejoin = async (field: Field) => {
    // Clear transient state but keep room info
    clearMessages();

    // Set up the room state
    setRoomId(field.code);
    setFieldName(field.name || `Field ${field.code}`);
    setParticipant({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: field.yourName,
      role: field.role,
      isOnline: true,
    });

    // Load existing messages for this room
    loadRoomMessages(field.code);

    // Navigate to the room
    router.push(`/room/${field.code}`);
  };

  const handleDelete = async (fieldId: string) => {
    if (!confirm('Are you sure you want to delete this field? This action cannot be undone.')) {
      return;
    }

    setDeletingId(fieldId);
    try {
      const response = await fetch(`/api/fields?id=${fieldId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFields(fields.filter(f => f.id !== fieldId));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete field');
      }
    } catch (error) {
      console.error('Error deleting field:', error);
      alert('Failed to delete field');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse mb-10">
        <div className="h-6 bg-[#C4D1BE]/30 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          <div className="h-20 bg-[#C4D1BE]/20 rounded-xl"></div>
          <div className="h-20 bg-[#C4D1BE]/20 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (fields.length === 0) {
    return null; // Don't show section if no fields
  }

  return (
    <div className="mb-10">
      <h2
        className="text-xl font-medium text-[#3D3531] mb-5"
        style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
      >
        Your Fields
      </h2>
      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.id}
            className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/10 p-5 hover:shadow-[0_10px_30px_-10px_rgba(92,107,86,0.15)] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-[#3D3531] truncate">
                    {field.name || `Field ${field.code}`}
                  </h3>
                  <span className="text-xs font-mono text-[#6B6560] bg-[#F7F4EE] px-2 py-0.5 rounded-md">
                    {field.code}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-[#6B6560]">
                  <span>
                    {field.partnerName ? (
                      <>with <span className="text-[#3D3531]">{field.partnerName}</span></>
                    ) : (
                      <span className="text-[#C4A484]">Waiting for partner</span>
                    )}
                  </span>
                  <span className="text-[#C4D1BE]">|</span>
                  <span>Last active {formatDate(field.lastActivityAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleRejoin(field)}
                  className="px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#5C6B56] text-white text-sm font-medium rounded-xl hover:from-[#7A8C74] hover:to-[#4B5A47] transition-all"
                >
                  Rejoin
                </button>
                <button
                  onClick={() => handleDelete(field.id)}
                  disabled={deletingId === field.id}
                  className="p-2 text-[#6B6560] hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                  title="Delete field"
                >
                  {deletingId === field.id ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
