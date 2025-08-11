import { useSnapshot } from "valtio";
import { state } from "../store/store";
import type { Chat } from "../types";

export default function ChatItem({ chat }: { chat: Chat }) {
  const { activeChatId } = useSnapshot(state);
  const isActive = activeChatId === chat.id;
  return (
    <li
      onClick={() => (state.activeChatId = chat.id)}
      className={`flex p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
        isActive ? "bg-green-50 dark:bg-green-900/30" : ""
      }`}
    >
      <img
        src={chat.contact.avatar}
        alt={chat.contact.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <span className="font-semibold">{chat.contact.name}</span>
          <span className="text-xs text-gray-500">
            {chat.lastMessage.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {chat.lastMessage.text}
        </p>
      </div>
      {chat.unread ? (
        <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 self-center">
          {chat.unread}
        </span>
      ) : null}
    </li>
  );
}
