import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import ConfirmationModal from "./modal/ConfirmationModal";

function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return iso;
  }
}

const BookingCard = ({ booking, onCancel }) => {
  const navigate = useNavigate();
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row md:justify-between gap-4">
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
            <div className="text-xs text-gray-400">Parking Category</div>
            <div
              className={`mt-t font-medium ${
                booking.parkingLotId?.autoApproval
                  ? "text-blue-500"
                  : "text-green-500"
              }`}
            >
              {booking.parkingLotId?.autoApproval
                ? "Individual"
                : "Organization"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Total charge</div>
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
        <div className="text-sm text-gray-500">
          Booked on {formatDateTime(booking.createdAt)}
        </div>
        <div className="flex gap-2">
          {booking.bookingStatus === "pending" && (
            <>
              <button
                className="px-4 py-2 rounded-lg border text-sm cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Cancel
              </button>
              <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => onCancel(booking)}
              />
            </>
          )}

          {booking.bookingStatus === "confirmed" && (
            <>
              <button
                className="px-4 py-2 rounded-lg border text-sm cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Cancel
              </button>
              <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => onCancel(booking)}
              />
              <button
                className="px-4 py-2 rounded-lg border text-sm cursor-pointer"
                onClick={() => navigate("/dashboard/message/inprogress")}
              >
                Enquiry
              </button>
            </>
          )}

          {booking.status === "in-progress" && (
            <button
              className="px-4 py-2 rounded-lg bg-green-600 text-white cursor-pointer"
              onClick={() => alert("Open navigation")}
            >
              Directions
            </button>
          )}

          {booking.bookingStatus === "completed" && (
            <button
              className="px-4 py-2 rounded-lg border text-sm cursor-pointer"
              onClick={() => alert("Download receipt")}
            >
              Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
