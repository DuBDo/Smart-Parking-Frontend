import React, { useEffect, useState } from "react";
import { useSocket } from "../../../utils/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import noBookingsImage from "/booking/no-bookings-found.png";
import DashboardSideBar from "../../DashboardSideBar";
import BookingCard from "./BookingCard";
import Pagination from "./Pagination";
import axios from "axios";
import Spinner from "../../ui/Spinner";

const OwnerBookings = () => {
  const { socket, isConnected } = useSocket();
  const { token, user, parkingLot } = useSelector((state) => state.user);
  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  const [selectedTab, setSelectedTab] = useState("pending");
  const [loading, setLoading] = useState(false);

  const [pendingBookings, setPendingBookings] = useState([]);
  const [inProgressBookings, setInProgressBookings] = useState([]);
  const [upcomingBookings, setUpComingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  const [page, setPage] = useState(1);
  const [totalCounts, setTotalCounts] = useState(0);

  let pages;
  const pageSize = 3;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BACKEND}/api/V1/booking/${parkingLot.id}/${selectedTab}`,
        {
          params: {
            limit: pageSize,
            skip: (page - 1) * pageSize,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (selectedTab == "pending") setPendingBookings(data.bookings);
      if (selectedTab == "in-progress") setInProgressBookings(data.bookings);
      if (selectedTab == "upcoming") setUpComingBookings(data.bookings);
      if (selectedTab == "past") setPastBookings(data.bookings);

      setTotalCounts(data.counts);
      pages = data.pages || Math.ceil(totalCounts / pageSize);
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedTab, page]);

  const onChangeStatus = async (id, newStatus) => {
    //we only need to change the pendingBookings
    const old = pendingBookings;
    try {
      const { data } = await axios.patch(
        `${BACKEND}/api/V1/booking/${id}/${newStatus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
    } catch (error) {}
  };
  return (
    <div className="flex">
      <DashboardSideBar />
      <div className="bg-[#f8fbfb] py-8 flex-1 px-52">
        <h1 className="font-medium text-lg">Bookings Received</h1>
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
            }}
          >
            Past
          </div>
        </div>

        {/* displaySection */}
        <div className="w-full min-h-[500px] max-h-[660px] my-9 px-3 py-3 border border-[#e5e5e5] rounded">
          {/* Pending */}
          {!pendingBookings?.length > 0 &&
          selectedTab === "pending" &&
          !loading ? (
            <div className="flex flex-col h-[500px]  max-h-[660px] justify-center items-center">
              <img src={noBookingsImage} alt="" className="w-42 h-42 " />
              <h2 className="text-xl text-[#999999] font-medium mt-4 mb-2">
                No bookings found
              </h2>
              <p className="text-base text-[#999999]">
                Pending bookings will appear here
              </p>
            </div>
          ) : (
            selectedTab === "pending" &&
            !loading &&
            pendingBookings.length > 0 && (
              <div className="max-w-full max-h-[660px] flex flex-col gap-3 mx-3 my-3">
                {pendingBookings.map((b, i) => (
                  <BookingCard
                    key={b._id || i}
                    booking={b}
                    onChangeStatus={onChangeStatus}
                  />
                ))}
              </div>
            )
          )}

          {/* in-progress */}
          {!inProgressBookings?.length > 0 &&
          selectedTab === "in-progress" &&
          !loading ? (
            <div className="flex flex-col h-[500px]  max-h-[660px] justify-center items-center">
              <img src={noBookingsImage} alt="" className="w-42 h-42 " />
              <h2 className="text-xl text-[#999999] font-medium mt-4 mb-2">
                No bookings found
              </h2>
              <p className="text-base text-[#999999]">
                In Progress bookings will appear here
              </p>
            </div>
          ) : (
            selectedTab === "in-progress" &&
            !loading &&
            inProgressBookings.length > 0 && (
              <div className="max-w-full max-h-[660px] flex flex-col gap-3 mx-3 my-3">
                {inProgressBookings.map((b, i) => (
                  <BookingCard
                    key={b._id || i}
                    booking={b}
                    onChangeStatus={onChangeStatus}
                  />
                ))}
              </div>
            )
          )}
          {/* Upcoming */}
          {!upcomingBookings?.length > 0 &&
          selectedTab === "upcoming" &&
          !loading ? (
            <div className="flex flex-col h-[500px]  max-h-[660px] justify-center items-center">
              <img src={noBookingsImage} alt="" className="w-42 h-42 " />
              <h2 className="text-xl text-[#999999] font-medium mt-4 mb-2">
                No bookings found
              </h2>
              <p className="text-base text-[#999999]">
                Upcoming bookings will appear here
              </p>
            </div>
          ) : (
            selectedTab === "upcoming" &&
            !loading &&
            upcomingBookings.length > 0 && (
              <div className="max-w-full max-h-[660px] flex flex-col gap-3 mx-3 my-3">
                {upcomingBookings.map((b, i) => (
                  <BookingCard
                    key={b._id || i}
                    booking={b}
                    onChangeStatus={onChangeStatus}
                  />
                ))}
              </div>
            )
          )}
          {/* Past */}
          {!pastBookings?.length > 0 && selectedTab === "past" && !loading ? (
            <div className="flex flex-col h-[500px]  max-h-[660px] justify-center items-center">
              <img src={noBookingsImage} alt="" className="w-42 h-42 " />
              <h2 className="text-xl text-[#999999] font-medium mt-4 mb-2">
                No bookings found
              </h2>
              <p className="text-base text-[#999999]">
                Past bookings will appear here
              </p>
            </div>
          ) : (
            selectedTab === "past" &&
            !loading &&
            pastBookings.length > 0 && (
              <div className="max-w-full max-h-[660px] flex flex-col gap-3 mx-3 my-3">
                {pastBookings.map((b, i) => (
                  <BookingCard
                    key={b._id || i}
                    booking={b}
                    onChangeStatus={onChangeStatus}
                  />
                ))}
              </div>
            )
          )}

          {loading && <Spinner />}

          {/* Pagination */}
          {!loading && pastBookings.length > 0 && (
            <Pagination
              page={page}
              total={totalCounts}
              setPage={setPage}
              pageSize={pageSize}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerBookings;
