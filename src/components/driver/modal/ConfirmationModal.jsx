import { useEffect } from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  useEffect(() => {
    if (isOpen) {
      // 1. Modal is open: Add the class to disable scrolling
      document.body.classList.add("overflow-hidden");
    } else {
      // 2. Modal is closed: Remove the class to enable scrolling
      document.body.classList.remove("overflow-hidden");
    }

    // 3. Cleanup function: CRITICAL to ensure scrolling is re-enabled
    // if the component is unmounted (e.g., component closure happens via state change)
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all overflow-hidden">
        <div className="p-6 bg-red-50">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-lg">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <h3
            className="mt-3 text-lg font-semibold leading-6 text-gray-900 text-center"
            id="modal-title"
          >
            Confirm cancellation
          </h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 text-center">
            Are you sure you want to cancel this booking? This action **cannot
            be undone** and may incur a cancellation fee based on our policy.
          </p>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">
          {/* cancel button */}
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-gray-300 rounded-lg hover:bg-gray-100 shadow-sm transition duration-150 cursor-pointer"
            type="button"
            onClick={onClose}
          >
            Go Back
          </button>
          {/* Confirm Button (Primary Action) */}
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white cursor-pointer bg-red-500 border border-transparent rounded-lg hover:bg-red-700 shadow-sm transition duration-150"
          >
            Yes, Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
