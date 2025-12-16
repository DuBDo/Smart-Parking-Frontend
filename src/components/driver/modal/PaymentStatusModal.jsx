import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const PaymentStatusModal = ({
  isOpen,
  status, // 'success' | 'failed'
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  const isSuccess = status === "success";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div
          className={`p-6 text-center ${
            isSuccess ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div
            className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="text-green-600" size={28} />
            ) : (
              <XCircle className="text-red-600" size={28} />
            )}
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            {isSuccess ? "Success" : "Failed"}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            {isSuccess
              ? "Your payment has been completed successfully."
              : "We couldn’t process your payment. Please try again."}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col justify-center items-center text-sm text-center">
          {isSuccess && (
            <>
              <p className="text-sm text-gray-500 align-center">
                You can arrive 5 minutes earlier and if you don't show up, the
                money will be refunded after deducting some amount according to
                our policy.
              </p>
              <p className="text-gray-500 mt-3">
                You can cancel your booking with 100% refund upto 24 hours
                before arrival.
              </p>
            </>
          )}

          {!isSuccess && (
            <p className="text-sm text-red-500 mt-3">
              Payment halted due to some reason.<br></br>No amount has been
              deducted from your account. Please try again.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-15 py-2 text-sm font-medium text-white bg-[#1fa637] rounded-lg transition hover:bg-green-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusModal;
