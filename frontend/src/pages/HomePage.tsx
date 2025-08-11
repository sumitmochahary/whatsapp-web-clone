import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useSnapshot } from "valtio";
import { state } from "../store/store";

export default function HomePage() {
  const { activeChatId } = useSnapshot(state);
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      {activeChatId ? (
        <ChatWindow />
      ) : (
        <div className="flex-1 flex-center text-gray-500">Select a chat</div>
      )}
    </div>
  );
}
