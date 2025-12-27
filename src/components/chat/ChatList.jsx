import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import axios from "axios";

export default function ChatList({
  userId,
  role,
  chats,
  activeRoom,
  setActiveRoom,
  setReceiverId,
  setBoookingId,
}) {
  return (
    <div className="overflow-y-auto w-1/3 h-full">
      {chats.map((chat) => (
        <ChatItem
          key={chat._id}
          chat={chat}
          role={role}
          userId={userId}
          setActiveRoom={setActiveRoom}
          activeRoom={activeRoom}
          setReceiverId={setReceiverId}
          setBoookingId={setBoookingId}
        />
      ))}
    </div>
  );
}
