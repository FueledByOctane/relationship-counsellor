import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, Participant } from '@/types';

interface ChatState {
  roomId: string | null;
  participant: Participant | null;
  partner: Participant | null;
  messages: Message[];
  isTyping: { [key: string]: boolean };
  isCounsellorTyping: boolean;
  _hasHydrated: boolean;
  setRoomId: (roomId: string) => void;
  setParticipant: (participant: Participant) => void;
  setPartner: (partner: Participant | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setTyping: (senderId: string, isTyping: boolean) => void;
  setCounsellorTyping: (isTyping: boolean) => void;
  setHasHydrated: (state: boolean) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      roomId: null,
      participant: null,
      partner: null,
      messages: [],
      isTyping: {},
      isCounsellorTyping: false,
      _hasHydrated: false,

      setRoomId: (roomId: string) => set({ roomId }),

      setParticipant: (participant: Participant) => set({ participant }),

      setPartner: (partner: Participant | null) => set({ partner }),

      addMessage: (message: Message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      setMessages: (messages: Message[]) => set({ messages }),

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
        participant: state.participant,
        messages: state.messages,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
