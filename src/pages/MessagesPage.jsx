import DashboardSideBar from "../components/DashboardSideBar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import noMessagesImage from "/messages/no-messages.png";
import { useSocket } from "../utils/SocketContext";
import Spinner from "../components/ui/Spinner";
import ChatList from "../components/chat/ChatList";
import ChatRoom from "../components/chat/ChatRoom";
import { useSearchParams } from "react-router-dom";

const MessagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "booked";

  const [chats, setChats] = useState([]);
  // for all messages
  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  const { user, token } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const tabs = ["booked", "enquiry", "past"];
  const [selectedTab, setSelectedTab] = useState(tab);

  const [activeRoom, setActiveRoom] = useState(null); //chatRoom._id
  const [receiverId, setReceiverId] = useState(null); //chatRoom.driver/owner._id
  const [bookingId, setBoookingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [bookedNotification, setBookedNotification] = useState([]);
  const [enquiryNotification, setEnquiryNotification] = useState([]);
  const [pastNotification, setPastNotification] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    if (!socket) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/chat/list?userId=${
          user._id
        }&tab=${selectedTab}`
      );

      setChats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  const handleClick = (clickedTab) => {
    setActiveRoom(null);
    setChats([]);
    setSelectedTab(clickedTab);
    setSearchParams({ tab: clickedTab });
    if (clickedTab === selectedTab) {
      fetchData();
    }
  };
  useEffect(() => {
    console.log(bookedNotification);
  }, [bookedNotification]);
  //Setting-up Socket-Listeners
  return (
    <>
      <div className="flex">
        <DashboardSideBar />
        <div className="bg-[#f8fbfb] py-8 flex-1 px-44">
          <h1 className="font-medium text-lg">Messages</h1>
          <p className="mt-3 text-sm text-[#212121]">
            Please try to reply to all messages as soon as possible. No one
            wants to be left hanging.
          </p>
          <div className="flex w-full pt-3 text-md font-semibold border-b border-[#e5e5e5]">
            <div
              className={`w-32 text-center relative py-3 h-auto cursor-pointer ${
                selectedTab === "booked"
                  ? "text-[#212121] border-b-4"
                  : "text-[#9e9e9e]"
              }`}
              onClick={() => {
                handleClick("booked");
              }}
            >
              Booked
              {
                (bookedNotification.length = 0 && (
                  <span className="absolute top-0 right-0 h-10 w-10 rounded-full">
                    {bookedNotification.length}
                  </span>
                ))
              }
            </div>

            <div
              className={`w-32 text-center py-3 h-auto cursor-pointer ${
                selectedTab === "enquiry"
                  ? "text-[#212121] border-b-4"
                  : "text-[#9e9e9e]"
              }`}
              onClick={() => {
                handleClick("enquiry");
              }}
            >
              Enquiries
            </div>

            <div
              className={`w-32 text-center py-3 h-auto cursor-pointer ${
                selectedTab === "past"
                  ? "text-[#212121] border-b-4"
                  : "text-[#9e9e9e]"
              }`}
              onClick={() => {
                handleClick("past");
              }}
            >
              Past
            </div>
          </div>

          {/* displaySection */}
          <div className="w-full h-[540px] flex gap-3 my-9 px-3 py-3 border border-[#e5e5e5] rounded overflow-hidden">
            {!loading ? (
              <>
                {" "}
                <ChatList
                  userId={user._id}
                  role={user.role}
                  chats={chats}
                  tab={selectedTab}
                  activeRoom={activeRoom}
                  setActiveRoom={setActiveRoom}
                  setReceiverId={setReceiverId}
                  setBoookingId={setBoookingId}
                />
                <ChatRoom
                  activeTab={selectedTab}
                  chatRoomId={activeRoom}
                  userId={user._id}
                  receiverId={receiverId}
                  bookingId={bookingId}
                  bookedNotification={bookedNotification}
                  setBookedNotification={setBookedNotification}
                  enquiryNotification={enquiryNotification}
                  setEnquiryNotification={setEnquiryNotification}
                  pastNotification={pastNotification}
                  setPastNotification={setPastNotification}
                  fetchChats={fetchData}
                />
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
