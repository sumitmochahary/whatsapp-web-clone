import type { Message } from "../types";

export default function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
          isMe
            ? "bg-green-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        }`}
      >
        {message.text}
        <div
          className={`text-xs mt-1 ${isMe ? "text-right" : ""} text-gray-400`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
