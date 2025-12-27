const tabs = [
  { key: "enquiries", label: "Enquiries" },
  { key: "booked", label: "Booked" },
  { key: "past", label: "Past" },
];

export default function ChatTabs({ tab, setTab }) {
  return (
    <div className="flex border-b">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => setTab(t.key)}
          className={`flex-1 py-3 text-sm font-medium ${
            tab === t.key
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
