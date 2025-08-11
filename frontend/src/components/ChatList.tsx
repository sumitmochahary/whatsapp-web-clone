import { useSnapshot } from "valtio";
import { state } from "../store/store";
import ChatItem from "./ChatItem";

export default function ChatList() {
  const { chats } = useSnapshot(state);
  return (
    <ul className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </ul>
  );
}
