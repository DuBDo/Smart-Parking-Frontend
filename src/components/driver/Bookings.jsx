import DashboardSideBar from "../DashboardSideBar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import noBookingsImage from "/booking/no-bookings-found.png";
import Pagination from "./Pagination";
import BookingCard from "./BookingCard";
import { useSocket } from "../../utils/SocketContext";

const Bookings = () => {
  const { socket, isConnected } = useSocket();
  const { token } = useSelector((state) => state.user);
  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  const tabs = ["pending", "in-progress", "upcoming", "past"];
  const [selectedTab, setSelectedTab] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalCounts, setTotalCounts] = useState(0);

  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const fetchData = useCallback(async () => {
    if (!socket) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${BACKEND}/api/V1/booking/${selectedTab}`,
        {
          params: {
            limit: pageSize,
            skip: (page - 1) * pageSize,
            q: query,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setBookings(data.bookings);
      setTotalCounts(data.counts ?? (data.bookings || []).length);
    } catch (error) {
      console.error(err);
      setError(err.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  }, [selectedTab, page, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    fetchData();
  }, [selectedTab, totalCounts, page]);

  //Setting-up Socket-Listeners
  useEffect(() => {
    if (!socket) return;

    const events = [
      "booking:created",
      "booking:confirmed",
      "booking:rejected",
      "booking:inProgress",
      "booking:entered",
      "booking:exited",
      "booking:autoCancelled",
      "booking:completed",
      "booking:cancelled",
      "booking:updated",
    ];

    const refresh = () => fetchData();

    events.forEach((event) => {
      socket.on(event, refresh);
    });

    return () => {
      events.forEach((event) => socket.off(event, refresh));
    };
  }, [socket, fetchData]);

  const onCancel = async (booking) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${BACKEND}/api/V1/booking/${booking._id}/cancel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (err) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex">
      <DashboardSideBar />
      <div className="bg-[#f8fbfb] py-8 flex-1 px-52">
        <h1 className="font-medium text-lg">My Bookings</h1>
        <div className="flex w-full pt-3 text-md font-semibold border-b border-[#e5e5e5]">
          <div
            className={`w-32 text-center py-3 h-auto cursor-pointer ${
              selectedTab === "pending"
                ? "text-[#212121] border-b-4"
                : "text-[#9e9e9e]"
            }`}
            onClick={() => {
              setSelectedTab("pending");
              setPage(1);
              setBookings([]);
            }}
          >
            Pending
          </div>
          <div
            className={`w-32 text-center py-3 h-auto cursor-pointer ${
              selectedTab === "in-progress"
                ? "text-[#212121] border-b-4"
                : "text-[#9e9e9e]"
            }`}
            onClick={() => {
              setSelectedTab("in-progress");
              setPage(1);
              setBookings([]);
              fetchData();
            }}
          >
            In progress
          </div>
          <div
            className={`w-32 text-center py-3 h-auto cursor-pointer ${
              selectedTab === "upcoming"
                ? "text-[#212121] border-b-4"
                : "text-[#9e9e9e]"
            }`}
            onClick={() => {
              setSelectedTab("upcoming");
              setPage(1);
              setBookings([]);
            }}
          >
            Upcoming
          </div>
          <div
            className={`w-32 text-center py-3 h-auto cursor-pointer ${
              selectedTab === "past"
                ? "text-[#212121] border-b-4"
                : "text-[#9e9e9e]"
            }`}
            onClick={() => {
              setSelectedTab("past");
              setPage(1);
              setBookings([]);
            }}
          >
            Past
          </div>
        </div>

        {/* displaySection */}
        <div className="w-full h-[660px] my-9 px-3 py-3 border border-[#e5e5e5] rounded">
          {!bookings?.length > 0 && !loading ? (
            <div className="flex flex-col  h-[660px] justify-center items-center">
              <img src={noBookingsImage} alt="" className="w-42 h-42 " />
              <h2 className="text-xl text-[#999999] font-medium mt-4 mb-2">
                No bookings found
              </h2>
              <p className="text-base text-[#999999]">
                {selectedTab == "in-progress"
                  ? "In progress"
                  : selectedTab == "upcoming"
                  ? "Upcoming"
                  : "Past"}{" "}
                bookings will appear here
              </p>
            </div>
          ) : (
            !loading &&
            bookings.length > 0 && (
              <div className="max-w-full max-h-[660px] flex flex-col gap-3 mx-3 my-3">
                {bookings.map((b) => (
                  <BookingCard key={b._id} booking={b} onCancel={onCancel} />
                ))}
              </div>
            )
          )}

          {/* Pagination */}
          {!loading && bookings?.length > 0 && (
            <Pagination
              page={page}
              setPage={setPage}
              total={totalCounts}
              pageSize={pageSize}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
