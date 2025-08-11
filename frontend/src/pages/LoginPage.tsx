import { useState } from "react";
import { login } from "../store/store";

export default function LoginPage() {
  const [name, setName] = useState("");
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) login(name.trim());
        }}
        className="w-full max-sm:px-4 sm:w-96 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">WhatsApp Web Clone</h1>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Enter
        </button>
      </form>
    </div>
  );
}
