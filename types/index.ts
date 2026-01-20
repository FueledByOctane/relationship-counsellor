export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderRole: 'partner-a' | 'partner-b' | 'counsellor';
  content: string;
  timestamp: number;
}

export interface Room {
  id: string;
  createdAt: number;
  participants: Participant[];
}

export interface Participant {
  id: string;
  name: string;
  role: 'partner-a' | 'partner-b';
  isOnline: boolean;
}

export interface TypingStatus {
  oderId: string;
  senderName: string;
  isTyping: boolean;
}

export interface ChatState {
  roomId: string | null;
  participant: Participant | null;
  partner: Participant | null;
  messages: Message[];
  isTyping: { [key: string]: boolean };
  isCounsellorTyping: boolean;
  setRoomId: (roomId: string) => void;
  setParticipant: (participant: Participant) => void;
  setPartner: (partner: Participant | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setTyping: (senderId: string, isTyping: boolean) => void;
  setCounsellorTyping: (isTyping: boolean) => void;
  reset: () => void;
}

export interface PusherMember {
  id: string;
  info: {
    name: string;
    role: 'partner-a' | 'partner-b';
  };
}
