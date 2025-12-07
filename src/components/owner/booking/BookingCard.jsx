import { useMemo, useState } from "react";
import ConfirmationModal from "../../driver/modal/ConfirmationModal";
import { format } from "date-fns";

function formatDateTime(d) {
  return format(new Date(d), "dd MMM yyyy, HH:mm");
}

const BookingCard = ({ booking, onChangeStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="w-full bg-white p-4 rounded-xl shadow-md border border-[#eeeeee] flex flex-col md:flex-row md:justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {booking.driverId?.firstName || "User"}{" "}
              {booking.driverId?.surName || ""}
            </h3>
            <div className="text-sm text-gray-500">
              {booking.driverId?.mobile || ""}
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
            {/* Vehicle Number bubble */}{" "}
            <div className="mt-t font-medium px-3 py-1 min-h-6 max-w-30 bg-gray-100 text-sm rounded-md text-gray-700">
              {" "}
              {booking.driverId?.vehicle[0]?.plate}{" "}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Total Earnings</div>
            <div className={`mt-1`}>
              Rs {booking.totalPrice}{" "}
              {booking.extraCharges ? (
                <span className={`text-red-400 font-semibold`}>
                  + Rs {booking.extraCharges}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:items-end">
        <div className="text-sm mt-1 text-gray-500">
          Booked on {formatDateTime(booking.createdAt)}
        </div>
        <div className="flex gap-4 mt-4.5">
          {booking.bookingStatus === "pending" &&
            !booking.parkingLotId?.autoApproval && (
              <>
                <button
                  className="px-7 py-2 rounded-xl hover:bg-green-600 bg-green-500 cursor-pointer"
                  onClick={onChangeStatus(booking._id, "confirm")}
                >
                  Confirm
                </button>
                <button
                  className="px-7 py-2 rounded-lg border border-[#a0a0a0] hover:bg-[#c9c9c9c8] cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Cancel
                </button>
                <ConfirmationModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onConfirm={() => onChangeStatus(booking._id, "cancel")}
                />
              </>
            )}

          {/* Messaging for confirmed bookings  */}
          {booking.bookingStatus == "completed" && (
            <button
              className="px-7 w-28 py-3 rounded-lg border border-[#a0a0a0] hover:bg-[#c9c9c9c8] cursor-pointer"
              //   onClick={onChangeStatus(booking._id, "accept")}
            >
              Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
