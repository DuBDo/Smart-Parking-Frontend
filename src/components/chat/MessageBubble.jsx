export default function MessageBubble({ message, isOwn }) {
  const time = new Date(message.timestamp || Date.now()).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const statusIcon = message.readAt ? "✓✓" : "✓"; // Double check for read

  return (
    <div
      className={`mb-2 flex ${
        isOwn ? "justify-end pl-12" : "justify-start pr-12"
      }`}
    >
      <div
        className={`relative max-w-sm px-3.5 py-0.5 rounded-3xl ${
          isOwn
            ? "bg-blue-500 text-white pr-6"
            : "bg-gray-100 text-gray-900 pl-6"
        }`}
      >
        {/* Message text */}
        <p className="text-base break-words pr-2">{message.text}</p>

        {/* Timestamp + status */}
        <div
          className={`mt-1 text-xs flex items-center gap-1 ${
            isOwn ? "text-blue-100 justify-end" : "text-gray-500"
          }`}
        >
          <span>{time}</span>
          {isOwn && <span className="font-medium">{statusIcon}</span>}
        </div>
      </div>
    </div>
  );
}
