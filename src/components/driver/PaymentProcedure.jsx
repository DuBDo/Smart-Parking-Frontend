import React, { useMemo, useState } from "react";
import esewa from "/payment-logo/esewa.png";
import khalti from "/payment-logo/khalti.png";
import { calculateDuration } from "../../utils/durationCalculator";
import dateFormator from "../../utils/dateFormator";
import { ShieldCheck, Clock, MapPin, CreditCard } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const PaymentProcedure = ({
  bookingId,
  name,
  address,
  fromTime,
  untilTime,
  perHourCharge,
  totalCharge,
}) => {
  const { token } = useSelector((state) => state.user);
  const [selected, setSelected] = useState(null);

  const durationString = useMemo(() => {
    const d = calculateDuration(fromTime, untilTime);
    if (!d) return "-";
    const h = d.hours ? `${d.hours} hrs ` : "";
    const m = `${String(d.minutes).padStart(2, "0")} mins`;
    return h + m;
  }, [fromTime, untilTime]);

  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  const handlePay = async (paymentType) => {
    try {
      if (paymentType == "esewa") {
        const res = await axios.post(
          `${BACKEND}/api/V1/payment/${paymentType}/initiate`,
          {
            bookingId,
            amount: totalCharge,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { paymentUrl, payload } = res.data;

        const form = document.createElement("form");
        form.method = "POST";
        form.action = paymentUrl;

        Object.entries(payload).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
      if (paymentType == "khalti") {
        const { data } = await axios.post(
          `${BACKEND}/api/V1/payment/${paymentType}/initiate`,
          { bookingId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        window.location.href = data.payment_url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full md:grid-cols-2 gap-6">
        {/* LEFT: Booking Summary */}
        <div className="bg-white rounded-2xl shadow-sm py-6 px-12">
          <h2 className="text-xl font-semibold mb-4">Booking summary</h2>

          <div className="flex items-start gap-3 mb-4">
            <MapPin className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-medium text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">{address}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Entering</span>
              <span className="font-medium">
                {dateFormator(new Date(fromTime))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Leaving</span>
              <span className="font-medium">
                {dateFormator(new Date(untilTime))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 flex items-center gap-1">
                <Clock size={14} /> Duration
              </span>
              <span className="font-medium">{durationString}</span>
            </div>
          </div>

          <div className="border-t border-t-[#e5e5e5] mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Rate/hour</span>
              <span>Rs. {perHourCharge}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total payable</span>
              <span className="text-green-600">Rs. {totalCharge}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 mb-5">
            <ShieldCheck size={14} className="text-green-600" />
            Secure & encrypted payment
          </div>

          <h2 className="text-lg font-semibold my-4 flex items-center gap-2">
            <CreditCard size={18} /> Payment method
          </h2>

          <div className="space-y-1">
            {/* Esewa */}
            <PaymentOption
              alt="eSewa"
              logo={esewa}
              active={selected === "esewa"}
              onClick={() => setSelected("esewa")}
            />

            {/* Khalti */}
            <PaymentOption
              alt="Khalti"
              logo={khalti}
              active={selected === "khalti"}
              onClick={() => setSelected("khalti")}
            />
          </div>

          <button
            disabled={!selected}
            onClick={() => handlePay(selected)}
            className={`mt-6 w-full py-3 rounded-xl font-semibold transition 
              ${
                selected
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Pay Rs. {totalCharge}
          </button>

          <p className="text-sm text-center text-gray-500 mt-2">
            You will be redirected to {selected || "the selected wallet"} to
            complete payment
          </p>
        </div>

        {/* RIGHT: Payment Methods */}
      </div>
    </div>
  );
};

const PaymentOption = ({ alt, logo, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-2 rounded-lg border cursor-pointer transition
        ${
          active
            ? "border-green-600 bg-green-50"
            : "border-gray-200 hover:bg-gray-50"
        }`}
    >
      <div className="flex items-center gap-3">
        <img src={logo} alt={alt} className="h-8 object-contain" />
      </div>
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${active ? "border-green-600" : "border-gray-300"}`}
      >
        {active && <span className="w-3 h-3 rounded-full bg-green-600" />}
      </span>
    </div>
  );
};

export default PaymentProcedure;
