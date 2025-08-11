// src/components/Sidebar.tsx
import { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import ChatList from "./ChatList";
import ThemeToggle from "./ThemeToggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { activeChatId } = useSnapshot(state);

  const closeDrawer = () => setOpen(false);

  return (
    <>
      {/* Mobile header with hamburger */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Open chat list"
        >
          <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>

        {activeChatId && (
          <span className="text-sm font-semibold">
            {/* Optional: show current chat name here */}
          </span>
        )}

        <ThemeToggle />
      </header>

      {/* Backdrop (only when drawer is open on mobile) */}
      {open && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
        />
      )}

      {/* Drawer / Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-80 md:w-96
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:z-auto
        `}
      >
        {/* Desktop header */}
        <header className="hidden md:flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Chats
          </h2>
          <ThemeToggle />
        </header>

        {/* Mobile close button */}
        <div className="md:hidden flex justify-end p-2">
          <button
            onClick={closeDrawer}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close chat list"
          >
            <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Chat list */}
        <div onClick={closeDrawer}>
          <ChatList />
        </div>
      </aside>
    </>
  );
}
