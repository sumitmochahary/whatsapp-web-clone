import { useSnapshot } from "valtio";
import { state, sendMessage } from "../store/store";
import { useState } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const { chats, activeChatId } = useSnapshot(state);
  const chat = chats.find((c) => c.id === activeChatId);
  const [text, setText] = useState("");

  if (!chat) return null;

  return (
    <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
      <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <img src={chat.contact.avatar} className="w-10 h-10 rounded-full" />
        <span className="ml-3 font-semibold">{chat.contact.name}</span>
      </header>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        <MessageBubble message={chat.lastMessage} />
      </div>

      <footer className="p-4 bg-white dark:bg-gray-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            sendMessage(chat.id, text);
            setText("");
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
          >
            Send
          </button>
        </form>
      </footer>
    </main>
  );
}
