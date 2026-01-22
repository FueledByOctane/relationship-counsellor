import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, Participant } from '@/types';

// Separate storage for messages per room
const ROOM_MESSAGES_KEY = 'room-messages';

function getRoomMessages(roomId: string): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(`${ROOM_MESSAGES_KEY}-${roomId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setRoomMessages(roomId: string, messages: Message[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${ROOM_MESSAGES_KEY}-${roomId}`, JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save room messages:', e);
  }
}

interface ChatState {
  roomId: string | null;
  fieldName: string | null;
  participant: Participant | null;
  partner: Participant | null;
  messages: Message[];
  isTyping: { [key: string]: boolean };
  isCounsellorTyping: boolean;
  _hasHydrated: boolean;
  setRoomId: (roomId: string) => void;
  setFieldName: (name: string | null) => void;
  setParticipant: (participant: Participant) => void;
  setPartner: (partner: Participant | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  mergeMessages: (newMessages: Message[]) => void;
  clearMessages: () => void;
  loadRoomMessages: (roomId: string) => void;
  setTyping: (senderId: string, isTyping: boolean) => void;
  setCounsellorTyping: (isTyping: boolean) => void;
  setHasHydrated: (state: boolean) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      roomId: null,
      fieldName: null,
      participant: null,
      partner: null,
      messages: [],
      isTyping: {},
      isCounsellorTyping: false,
      _hasHydrated: false,

      setRoomId: (roomId: string) => set({ roomId }),

      setFieldName: (name: string | null) => set({ fieldName: name }),

      setParticipant: (participant: Participant) => set({ participant }),

      setPartner: (partner: Participant | null) => set({ partner }),

      addMessage: (message: Message) =>
        set((state) => {
          // Prevent duplicate messages (same ID already exists)
          if (state.messages.some((m) => m.id === message.id)) {
            return state;
          }
          const newMessages = [...state.messages, message];
          // Persist messages to room-specific storage
          if (state.roomId) {
            setRoomMessages(state.roomId, newMessages);
          }
          return { messages: newMessages };
        }),

      setMessages: (messages: Message[]) => {
        const state = get();
        // Persist messages to room-specific storage
        if (state.roomId) {
          setRoomMessages(state.roomId, messages);
        }
        set({ messages });
      },

      mergeMessages: (newMessages: Message[]) => {
        const state = get();
        // Merge messages, avoiding duplicates by ID, and sort by timestamp
        const existingIds = new Set(state.messages.map((m) => m.id));
        const uniqueNewMessages = newMessages.filter((m) => !existingIds.has(m.id));
        if (uniqueNewMessages.length === 0) return;

        const merged = [...state.messages, ...uniqueNewMessages].sort(
          (a, b) => a.timestamp - b.timestamp
        );
        // Persist to room-specific storage
        if (state.roomId) {
          setRoomMessages(state.roomId, merged);
        }
        set({ messages: merged });
      },

      clearMessages: () => set({ messages: [], partner: null, isTyping: {}, isCounsellorTyping: false }),

      loadRoomMessages: (roomId: string) => {
        const messages = getRoomMessages(roomId);
        set({ messages });
      },

      setTyping: (senderId: string, isTyping: boolean) =>
        set((state) => ({
          isTyping: { ...state.isTyping, [senderId]: isTyping },
        })),

      setCounsellorTyping: (isTyping: boolean) =>
        set({ isCounsellorTyping: isTyping }),

      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      reset: () =>
        set({
          roomId: null,
          fieldName: null,
          participant: null,
          partner: null,
          messages: [],
          isTyping: {},
          isCounsellorTyping: false,
        }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        roomId: state.roomId,
        fieldName: state.fieldName,
        participant: state.participant,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        // Load messages for the current room after hydration
        if (state?.roomId) {
          state.loadRoomMessages(state.roomId);
        }
      },
    }
  )
);
