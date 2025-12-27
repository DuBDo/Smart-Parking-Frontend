import { useState } from "react";
import { useSelector } from "react-redux";

export default function ChatItem({
  chat,
  userId,
  role,
  activeRoom,
  setActiveRoom,
  setReceiverId,
  setBoookingId,
}) {
  const otherUser = chat.driver._id === userId ? chat.owner : chat.driver;

  const [startDate, setStartDate] = useState(
    new Date(chat.bookingId.startTime) || null
  );
  const [endDate, setEndDate] = useState(
    new Date(chat.bookingId.startTime) || null
  );

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // false for 24-hour format
  });

  return (
    <div
      onClick={() => {
        setActiveRoom(chat._id);
        setReceiverId(
          chat.driver._id === userId ? chat.owner._id : chat.driver._id
        );
        setBoookingId(chat.bookingId._id);
      }}
      className={`px-1 py-2 border-b-2 cursor-pointer hover:bg-[#eff4f4] ${
        activeRoom == chat._id ? "bg-[#eff4f4]" : ""
      }`}
    >
      {role === "owner" ? (
        <>
          <div className="font-semibold">{otherUser.firstName}</div>
          <div className="flex justify-between">
            <div className="flex flex-col text-sm">
              <div>From</div>
              <div className="text-xs text-gray-500">
                {formatter.format(startDate)}
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div>To</div>
              <div className="text-xs text-gray-500">
                {formatter.format(endDate)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="font-semibold">
            {chat.bookingId.parkingLotId.name}
          </div>
          <div className="text-sm">{chat.bookingId.parkingLotId.address}</div>
        </>
      )}
    </div>
  );
}
