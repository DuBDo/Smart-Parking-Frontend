import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from "lucide-react";
import { FaRegStar } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiShield } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";

const rating = 1.7;
const totalRatings = 101;
export default function ParkingDetailsCard({
  bookingType,
  images,
  pricePerHour,
  totalPrice,
}) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="bg-white text-[#212121] rounded-xl shadow-md overflow-hidden">
      {/* Image carousel */}
      <div className="relative h-[280px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          disabled={index == 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full cursor-pointer ${
            index === 0 ? "bg-black/30" : "bg-black/60 hover:bg-black/70"
          }
  `}
        >
          <ChevronLeft size={25} />
        </button>
        <button
          onClick={next}
          disabled={index == images.length - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full cursor-pointer ${
            index === images.length - 1
              ? "bg-black/30"
              : "bg-black/60 hover:bg-black/70"
          }`}
        >
          <ChevronRight size={25} />
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {index + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Content */}
      {/* Parking lot name */}
      <div className="p-8">
        <h3 className="text-lg font-semibold">Q-Park Mailbox Car Park</h3>

        {/* ratings  */}
        <div className="w-1/3 flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => {
              const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100;

              return (
                <div key={i} className="relative w-4 h-4">
                  {/* Empty Star */}
                  <Star className="w-4 h-4 text-[#dfebf1] fill-[#dfebf1]" />

                  {/* Filled part (clipped) */}
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${fillPercent}%` }}
                  >
                    <Star className="w-4 h-4 text-[#f7b408] fill-[#f7b408]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rating text */}
          <span className="w-1/3">({totalRatings})</span>
        </div>

        <div className="mt-6 pt-5 flex flex-col gap-4 border-t border-t-[#e4e4e4]">
          {bookingType == "hourly/daily" ? (
            <>
              <div className="flex justify-between text-lg">
                <p>Per hour charge</p>
                <p>Rs{pricePerHour}</p>
              </div>
              <div className="flex justify-between text-xl font-semibold">
                <p>Total charges</p>
                <p>Rs{totalPrice}</p>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-xl font-semibold">
              <p>Total charge for one month</p>
              <p>Rs{totalPrice}</p>
            </div>
          )}
        </div>
        <div className="mt-6 pt-5 text-green-600 font-medium flex items-center gap-2  border-t border-t-[#e4e4e4]">
          <ShieldCheck size={22} />
          Best Price Guaranteed
        </div>
        {/* about this system */}
        <div className="mt-6 pt-5 flex flex-col gap-4 border-t border-t-[#e4e4e4]">
          <div className="flex items-center gap-4">
            <FaRegStar size={25} className="text-[#429aea]" />
            <span className="font-semibold text-lg">161,000+ reviews</span>
          </div>
          <div className="flex items-center gap-4">
            <FaRegCircleCheck size={23} className="text-[#429aea] " />
            <span className="font-semibold text-lg">Trusted by10m drivers</span>
          </div>
          <div className="flex items-center gap-4 leading-1">
            <FiShield size={29} className="text-[#429aea]" />
            <span className="font-semibold text-lg">
              Free cancellation up to 24 hours before arrival
            </span>
          </div>
          <div className="flex items-center gap-4 leading-1">
            <RiCustomerService2Line size={25} className="text-[#429aea]" />
            <span className="font-semibold text-lg">
              Award-winning customer service
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
