import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useSocket } from "../../utils/SocketContext";

export default function ChatView({
  activeTab,
  chatRoomId,
  userId,
  receiverId,
  bookingId,
  bookedNotification,
  setBookedNotification,
  enquiryNotification,
  setEnquiryNotification,
  pastNotification,
  setPastNotification,
  fetchChats,
}) {
  const { socket } = useSocket();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const fetchMessages = async () => {
    if (!chatRoomId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/chat/messages/${chatRoomId}`
      );
      setMessages(res.data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      // You could add toast notification here
    } finally {
      setLoading(false);
      socket.emit("join-chat-room", chatRoomId);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || !chatRoomId) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/chat/send`,
        {
          receiverId,
          senderId: userId,
          text: text.trim(),
          chatRoomId, // often required on backend
          bookingId,
        }
      );
      console.log(res.data);
      // Optimistically add the sent  message
      setMessages((prev) => [...prev, res.data]);
      socket.emit("new-message", res.data, userId);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Handle error (e.g., show toast)
    }
  };
  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (chatRoomId != newMessageReceived.chatRoom) {
        //give notification
        if (
          activeTab == "booked" &&
          !bookedNotification.includes(newMessageReceived)
        ) {
          setBookedNotification((prev) => {
            // Avoid duplicates by message _id
            if (
              prev.some((msg) => msg.chatRoom === newMessageReceived.chatRoom)
            ) {
              console.log(prev);
              return prev; // already have it
            }
            return [...prev, newMessageReceived];
          });
        }
        if (
          activeTab == "enquiry" &&
          !enquiryNotification.includes(newMessageReceived)
        ) {
          setEnquiryNotification([newMessageReceived, ...enquiryNotification]);
        }
        if (
          activeTab == "past" &&
          !pastNotification.includes(newMessageReceived)
        ) {
          setPastNotification([newMessageReceived, ...pastNotification]);
        }
      } else {
        setMessages((prev) => [...prev, newMessageReceived]);
        markAsRead();
      }
    });
    return () => {
      socket.off("new-message");
      socket.off("messages-read");
      socket.emit("leave-room", chatRoomId);
    };
  }, [socket, chatRoomId]);
  const markAsRead = async () => {
    if (!chatRoomId || !userId) return;
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/V1/chat/read`, {
        chatRoomId,
        userId,
      });
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  // Fetch messages and mark as read when chat changes
  useEffect(() => {
    if (!chatRoomId) {
      setMessages([]);
      return;
    }
    fetchMessages();
    markAsRead();
  }, [chatRoomId]);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!chatRoomId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
        <p className="text-lg">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-300"
      >
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No messages yet</p>
            <p className="text-sm mt-2">Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((msg) => (
              <MessageBubble
                key={msg._id}
                message={msg}
                isOwn={msg.sender === userId || msg.senderId === userId} // flexible sender field
              />
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-3 py-3">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
