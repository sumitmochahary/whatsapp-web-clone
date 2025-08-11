import { proxy } from "valtio";
import type { Chat, Message } from "../types";

type State = {
  user: { id: string; name: string } | null;
  chats: Chat[];
  activeChatId: string | null;
  dark: boolean;
};

export const state = proxy<State>({
  user: null,
  chats: [],
  activeChatId: null,
  dark: false,
});

export const login = (name: string) => {
  state.user = { id: "me", name };
  state.chats = [
    {
      id: "1",
      contact: {
        id: "1",
        name: "Alice",
        avatar: "https://i.pravatar.cc/150?u=alice",
      },
      lastMessage: {
        id: "m1",
        text: "Hey, how are you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        sender: "them",
      },
      unread: 1,
    },
    {
      id: "2",
      contact: {
        id: "2",
        name: "Bob",
        avatar: "https://i.pravatar.cc/150?u=bob",
      },
      lastMessage: {
        id: "m2",
        text: "See you tomorrow!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        sender: "me",
      },
      unread: 0,
    },
  ];
};

export const sendMessage = (chatId: string, text: string) => {
  const chat = state.chats.find((c) => c.id === chatId);
  if (!chat) return;
  const newMsg: Message = {
    id: crypto.randomUUID(),
    text,
    timestamp: new Date(),
    sender: "me",
  };
  chat.lastMessage = newMsg;
  chat.unread = 0;
};
