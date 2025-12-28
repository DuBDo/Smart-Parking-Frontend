import { Star, ShieldCheck, Zap } from "lucide-react";

export default function ParkingCard({
  id,
  image,
  name,
  rating,
  totalRatings,
  totalBookings,
  address,
  durationToDestination, // "23 mins"
  price,
  evCharger,
  onReserve,
  onClick,
  setHovered,
}) {
  return (
    <div
      className="flex w-[370px] bg-white rounded-xl shadow border border-[#ccc] overflow-hidden cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Left image */}
      <div className="w-[30%] h-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      {/* Right content */}
      <div className="w-[70%] flex flex-col justify-between">
        <div className="p-3 flex flex-col">
          {/* Title */}
          <h2 className="font-semibold text-[17px] leading-tight">{name}</h2>

          {/* Address */}
          <p className="text-gray-700 text-[13px] mt-[2px] leading-tight truncate">
            {address}
          </p>

          {/* Rating + Bookings + Safety */}
          <div className="flex items-center justify-between gap-2 text-sm mt-1">
            <div className="w-1/3 flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => {
                  const fillPercent =
                    Math.min(Math.max(rating - i, 0), 1) * 100;

                  return (
                    <div key={i} className="relative w-3 h-3">
                      {/* Empty Star */}
                      <Star className="w-3 h-3 text-[#dfebf1] fill-[#dfebf1]" />

                      {/* Filled part (clipped) */}
                      <div
                        className="absolute top-0 left-0 overflow-hidden"
                        style={{ width: `${fillPercent}%` }}
                      >
                        <Star className="w-3 h-3 text-[#f7b408] fill-[#f7b408]" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rating text */}
              <span className="w-1/3 text-[13px] text-gray-600">
                ({totalRatings})
              </span>
            </div>

            {/* bookings */}
            <span className="text-gray-600 text-[13px] pl-2 border-l border-[#ccc]">
              {totalBookings}+ bookings
            </span>

            {/* Trust shield */}
            <div className="w-1/7 pl-2 border-l border-[#ccc] ">
              <ShieldCheck className="w-4 h-4 text-green-600 " />
            </div>
          </div>

          {/* EV charger + duration */}
          <div className="text-[14px] mt-1 flex items-center gap-3">
            <p className="text-black">
              <span className="font-medium ">{durationToDestination} mins</span>{" "}
              to destination
            </p>

            {/* EV */}
            {evCharger && (
              <span className="flex items-center text-green-600 text-sm font-medium">
                <Zap className="w-4 h-4 mr-[3px]" />
                EV
              </span>
            )}
          </div>
        </div>
        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReserve(id);
          }}
          className="w-full bg-[#1fa637] hover:bg-green-700 text-white font-semibold py-1.5 cursor-pointer"
        >
          Reserve for Rs {price}
        </button>
      </div>
    </div>
  );
}
