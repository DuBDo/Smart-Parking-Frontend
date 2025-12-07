import { useEffect, useMemo, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
/*
  DriverBookingsFull.jsx
  - A complete, responsive, JustPark-like "Bookings Made" page for drivers.
  - Features included:
    * Tabs: In progress / Upcoming / Past
    * Booking cards for each group
    * Skeleton loaders while fetching
    * Server integration (GET /api/bookings/user/groups)
    * Socket.IO realtime subscription (auto refresh on events)
    * Local time-based polling fallback to move bookings between groups
    * Filters + simple pagination for each tab
    * Responsive layout and sidebar

  Integration notes:
   - Environment: VITE_BACKEND_URL (e.g. http://localhost:8000)
   - The client should set localStorage.setItem('userId', user._id) on login
   - Socket connects using query { userId }
   - API used: GET `${VITE_BACKEND_URL}/api/bookings/user/groups?limit=...&skip...&q=...`
     (server controller earlier provided returns grouped bookings; this UI expects that endpoint)

  Save this file into: src/pages/DriverBookingsFull.jsx and import into your router.
*/

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const SOCKET_PATH = BACKEND; // if same origin; can be different

function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return iso;
  }
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white p-4 rounded-xl shadow-sm border">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded col-span-2" />
      </div>
      <div className="h-8 bg-gray-200 rounded mt-4 w-32" />
    </div>
  );
}

function BookingCard({ booking, onCancel }) {
  const statusBadge = useMemo(() => {
    const s = booking.bookingStatus;
    const map = {
      confirmed: "bg-yellow-100 text-yellow-800",
      upcoming: "bg-indigo-50 text-indigo-700",
      "in-progress": "bg-blue-50 text-blue-700",
      active: "bg-green-50 text-green-700",
      completed: "bg-gray-100 text-gray-700",
      cancelled: "bg-red-50 text-red-700",
      rejected: "bg-red-50 text-red-700",
      pending: "bg-gray-50 text-gray-700",
    };
    return map[s] || "bg-gray-50 text-gray-700";
  }, [booking.bookingStatus]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row md:justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {booking.parkingLotId?.name || "Parking Lot"}
            </h3>
            <div className="text-sm text-gray-500">
              {booking.parkingLotId?.address || ""}
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge}`}
          >
            {booking.bookingStatus}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
          <div>
            <div className="text-xs text-gray-400">Start</div>
            <div className="mt-1">{formatDateTime(booking.startTime)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">End</div>
            <div className="mt-1">{formatDateTime(booking.endTime)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Vehicle</div>
            <div className="mt-1">
              {booking.vehiclePlate} • {booking.vehicleType}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Price paid / Due</div>
            <div className="mt-1">
              Rs {booking.totalPrice}{" "}
              {booking.amountDue ? `(due Rs ${booking.amountDue})` : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:items-end">
        <div className="text-sm text-gray-500">
          Booked on {formatDateTime(booking.createdAt)}
        </div>
        <div className="flex gap-2">
          {booking.bookingStatus === "pending" && (
            <button className="px-4 py-2 rounded-lg border text-sm" disabled>
              Pending
            </button>
          )}

          {booking.bookingStatus === "confirmed" && (
            <button
              className="px-4 py-2 rounded-lg border text-sm"
              onClick={() => onCancel(booking)}
            >
              Cancel
            </button>
          )}

          {booking.bookingStatus === "active" && (
            <button
              className="px-4 py-2 rounded-lg bg-green-600 text-white"
              onClick={() => alert("Open navigation")}
            >
              Directions
            </button>
          )}

          {booking.bookingStatus === "completed" && (
            <button
              className="px-4 py-2 rounded-lg border text-sm"
              onClick={() => alert("Download receipt")}
            >
              Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, setPage, total, pageSize }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button
        className="px-3 py-1 border rounded"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Prev
      </button>
      <div className="text-sm">
        Page {page} of {totalPages}
      </div>
      <button
        className="px-3 py-1 border rounded"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default function BookingsMade() {
  const { token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("in-progress");
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState({
    upcoming: [],
    inProgress: [],
    past: [],
  });
  const socketRef = useRef(null);
  const [error, setError] = useState(null);

  // simple filter + pagination states
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [totalCounts, setTotalCounts] = useState({
    upcoming: 0,
    inProgress: 0,
    past: 0,
  });

  // fetch function
  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BACKEND}/api/V1/booking/user/groups`,
        {
          // params: {
          //   limit: pageSize,
          //   skip: (page - 1) * pageSize,
          //   q: query,
          // },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend returns upcoming, inProgress, past arrays
      setGroups({
        upcoming: data.upcoming || [],
        inProgress: data.inProgress || [],
        past: data.past || [],
      });
      // set counts if backend provides them (optional). fallback uses array length
      setTotalCounts({
        upcoming: data.upcomingCount ?? (data.upcoming || []).length,
        inProgress: data.inProgressCount ?? (data.inProgress || []).length,
        past: data.pastCount ?? (data.past || []).length,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  };

  // initial fetch and reconnect on tab/page/query changes
  useEffect(() => {
    fetchGroups();
  }, [activeTab, page, query]);

  // Setup socket and auto-update listeners
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return; // not logged in

    const socket = io(SOCKET_PATH, { query: { userId } });
    socketRef.current = socket;

    const handlers = [
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
    handlers.forEach((evt) => socket.on(evt, () => fetchGroups()));

    socket.on("connect", () => console.debug("socket connected"));
    socket.on("disconnect", () => console.debug("socket disconnected"));

    return () => {
      handlers.forEach((evt) => socket.off(evt));
      socket.disconnect();
    };
  }, []);

  // time-based polling fallback every 30s to move groups

  const onCancel = async (booking) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      const res = await fetch(
        `${BACKEND}/api/V1/bookings/${booking._id}/cancel`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Cancel failed");
      fetchGroups();
    } catch (err) {
      alert("Cancel failed");
    }
  };

  // derive items for active tab with pagination
  const items = useMemo(() => {
    if (activeTab === "in-progress") return groups.inProgress || [];
    if (activeTab === "upcoming") return groups.upcoming || [];
    return groups.past || [];
  }, [activeTab, groups]);

  const totalForTab = useMemo(() => {
    if (activeTab === "in-progress")
      return totalCounts.inProgress || (groups.inProgress || []).length;
    if (activeTab === "upcoming")
      return totalCounts.upcoming || (groups.upcoming || []).length;
    return totalCounts.past || (groups.past || []).length;
  }, [activeTab, totalCounts, groups]);

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden lg:block">
        <h2 className="text-lg font-semibold mb-6">Bookings made</h2>
        <nav className="flex flex-col gap-4 text-gray-600">
          <a className="hover:text-black">Bookings made</a>
          <a className="hover:text-black">Messages</a>
          <a className="hover:text-black">Billing & withdrawals</a>
          <a className="hover:text-black">My profile</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        {/* Tabs + controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex gap-8 border-b pb-3">
            <button
              className={`pb-2 text-lg ${
                activeTab === "in-progress"
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("in-progress");
                setPage(1);
              }}
            >
              In progress
            </button>
            <button
              className={`pb-2 text-lg ${
                activeTab === "upcoming"
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("upcoming");
                setPage(1);
              }}
            >
              Upcoming
            </button>
            <button
              className={`pb-2 text-lg ${
                activeTab === "past"
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("past");
                setPage(1);
              }}
            >
              Past
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by lot, plate..."
              className="px-3 py-2 border rounded-lg"
            />
            <select
              className="px-3 py-2 border rounded-lg"
              onChange={(e) => {
                setPage(1);
                setQuery((prev) => prev);
              }}
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending payment</option>
            </select>
          </div>
        </div>

        {/* Content area */}
        <div className="space-y-4">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-sm border text-center">
              <img
                src="/empty-bookings-illustration.png"
                alt="No bookings"
                className="w-40 mx-auto opacity-80"
              />
              <h3 className="text-lg font-semibold mt-6">No bookings found</h3>
              <p className="text-sm text-gray-500 mt-2">
                {activeTab === "past"
                  ? "Past bookings will appear here"
                  : activeTab === "upcoming"
                  ? "Upcoming bookings will appear here"
                  : "Bookings in progress will appear here"}
              </p>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((b) => (
                <BookingCard key={b._id} booking={b} onCancel={onCancel} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && items.length > 0 && (
            <Pagination
              page={page}
              setPage={setPage}
              total={totalForTab}
              pageSize={pageSize}
            />
          )}

          {error && <div className="text-red-600">{error}</div>}
        </div>
      </main>
    </div>
  );
}
