import { useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Car,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function OwnerBookingReceived({ booking }) {
  useEffect(() => {
    socket.on("booking:received", (data) => {
      console.log("New booking received:", data);
      // You can trigger UI update or toast notification here
    });

    return () => {
      socket.off("booking:received");
    };
  }, []);

  const approveBooking = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/booking/approve/${
        booking._id
      }`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
  };

  const declineBooking = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/booking/decline/${
        booking._id
      }`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
  };

  return (
    <div className="px-6 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Booking from {booking.driver.name}
        </h1>
        <p
          className={`mt-2 inline-block px-3 py-1 rounded-full text-sm
          ${
            booking.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : booking.status === "confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {booking.status === "pending" && "Pending Approval"}
          {booking.status === "confirmed" && "Confirmed"}
          {booking.status === "cancelled" && "Cancelled"}
        </p>
      </div>

      {/* Booking summary */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Booking Summary</h2>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Arrival:</strong> {booking.startTime}
          </p>
          <p>
            <strong>Leaving:</strong> {booking.endTime}
          </p>
          <p>
            <strong>Duration:</strong> {booking.duration} hrs
          </p>
          <p>
            <strong>Earnings:</strong> NPR {booking.ownerEarnings}
          </p>
          <p>
            <strong>Payment:</strong> Paid
          </p>
        </div>
      </div>

      {/* Driver details */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Driver Details</h2>

        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>

          <div className="text-gray-700">
            <p className="font-semibold text-lg">{booking.driver.name}</p>

            <div className="flex items-center mt-1">
              <Mail size={16} className="mr-2 text-gray-500" />
              {booking.driver.email}
            </div>

            <div className="flex items-center mt-1">
              <Phone size={16} className="mr-2 text-gray-500" />
              {booking.driver.phone}
            </div>

            <div className="flex items-center mt-2">
              <Car size={16} className="mr-2 text-gray-500" />
              {booking.vehicle.make} • {booking.vehicle.color}, Plate:{" "}
              {booking.vehicle.plate}
            </div>
          </div>
        </div>
      </div>

      {/* Space details */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Space Details</h2>

        <p className="flex items-center gap-2 text-gray-700">
          <MapPin size={18} /> {booking.space.address}
        </p>

        <div className="w-full h-40 bg-gray-200 rounded-lg mt-3">
          {/* Map snapshot */}
        </div>

        <p className="text-gray-600 mt-3">{booking.space.instructions}</p>
      </div>

      {/* Action buttons */}
      {booking.status === "pending" && (
        <div className="flex gap-4">
          <button
            onClick={approveBooking}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Approve Booking
          </button>

          <button
            onClick={declineBooking}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Decline Booking
          </button>
        </div>
      )}

      {booking.status === "confirmed" && (
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Message Driver
          </button>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg">
            Mark as In Use
          </button>
        </div>
      )}
    </div>
  );
}
