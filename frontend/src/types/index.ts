export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: "me" | "them";
}

export interface Chat {
  id: string;
  contact: User;
  lastMessage: Message;
  unread: number;
}
