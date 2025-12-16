import { useEffect } from "react";

const MODAL_CONFIG = {
  success: {
    title: "Booking reserved successfully",
    description:
      "Your parking slot has been temporarily reserved. Please complete the payment from your bookings page to confirm it.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    headerBg: "bg-green-50",
    buttonBg: "bg-green-600 hover:bg-green-700",
    buttonText: "Proceed to payment",
    Icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    ),
  },
  failed: {
    title: "Booking failed",
    description:
      "We couldn’t reserve your parking slot at the moment. Please try again or choose a different time.",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    headerBg: "bg-red-50",
    buttonBg: "bg-red-600 hover:bg-red-700",
    buttonText: "Go to bookings",
    Icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
  },
};

const ProceedBookingModal = ({
  type = "success",
  isOpen,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = "17px";
    } else {
      document.body.style.paddingRight = "";
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.style.paddingRight = "";
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const config = MODAL_CONFIG[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className={`p-6 ${config.headerBg}`}>
          <div
            className={`flex items-center justify-center w-12 h-12 mx-auto rounded-lg ${config.iconBg}`}
          >
            <svg
              className={`w-6 h-6 ${config.iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {config.Icon}
            </svg>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
            {config.title}
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-gray-600 text-center">
            {config.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-3 px-6 py-4 bg-gray-50">
          {type == "failed" ? (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={onConfirm}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${config.buttonBg} cursor-pointer`}
            >
              {config.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProceedBookingModal;
