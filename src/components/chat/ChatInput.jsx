import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
        }
        className="flex-1 h-10 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition"
        placeholder="Type a message..."
        autoFocus
      />
      <button
        onClick={submit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-colors duration-200 shadow-md cursor-pointer"
      >
        <span>Send</span>
      </button>
    </div>
  );
}
