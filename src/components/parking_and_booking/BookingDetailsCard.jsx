import { HiOutlineArrowRightEndOnRectangle } from "react-icons/hi2";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { LuCalendarDays } from "react-icons/lu";
import { RiWalletLine } from "react-icons/ri";

import { MdOutlineTimer } from "react-icons/md";
import dateFormator from "../../utils/dateFormator";
import DateTimePicker from "../ui/DateTimePicker";
import DatePicker from "../ui/DatePicker";
import { useEffect, useState } from "react";
import { calculateDuration } from "../../utils/durationCalculator";

const BookingDetailsCard = ({
  type,
  from,
  setFrom,
  until,
  setUntil,
  startingOn,
  setStartingOn,
  availability,
  firstPayment,
  duration,
  setDuration,
}) => {
  const [openFromCalendar, setOpenFromCalendar] = useState(false);
  const [openUntilCalendar, setOpenUntilCalendar] = useState(false);
  const [openStartingOnCalendar, setOpenStartingOnCalendar] = useState(false);

  useEffect(() => {
    setDuration(calculateDuration(from, until));
  }, [from, until]);
  return (
    <div className="w-full p-8 flex flex-col gap-6 bg-white border border-[#dddddd] rounded-lg">
      <h2 className="text-[#212121] text-2xl font-medium">Booking details</h2>
      {type === "hourly/daily" ? (
        // for daily/hourly
        <>
          {/* arriving on */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <HiOutlineArrowRightEndOnRectangle size={24} />

              <p className="text-[17px]">Arriving on</p>
            </div>
            <p
              className="underline relative font-medium text-[17px] cursor-pointer"
              onClick={() => setOpenFromCalendar(true)}
            >
              {dateFormator(from)}
              {/* arriving on calendar  */}
              {openFromCalendar && (
                <DateTimePicker
                  type="from"
                  value={from}
                  setShowPicker={setOpenFromCalendar}
                  onChange={setFrom}
                />
              )}
            </p>
          </div>
          {/* leaving on */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <HiOutlineArrowRightStartOnRectangle size={24} />

              <p className="text-[17px]">Leaving on</p>
            </div>
            <p
              className="relative underline font-medium text-[17px] cursor-pointer"
              onClick={() => setOpenUntilCalendar(true)}
            >
              {dateFormator(until)}
              {/* leaving on calendar  */}
              {openUntilCalendar && (
                <DateTimePicker
                  type="until"
                  value={until}
                  setShowPicker={setOpenUntilCalendar}
                  onChange={setUntil}
                />
              )}
            </p>
          </div>
          {/* Duration  */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <MdOutlineTimer size={24} />

              <p className="text-[17px]">Duration</p>
            </div>
            <p className="relative font-medium text-[17px] cursor-pointer">
              {duration?.hours + "hours " + duration?.minutes + "minutes"}
            </p>
          </div>
        </>
      ) : (
        // for monthly plan
        <>
          {/* starting date */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <LuCalendarDays size={24} />

              <p className="text-[17px]">Starting date</p>
            </div>
            <p
              className="underline relative font-medium text-[17px] cursor-pointer"
              onClick={() => setOpenStartingOnCalendar(true)}
            >
              {dateFormator(startingOn)}
              {/* arriving on calendar  */}
              {openStartingOnCalendar && (
                <DatePicker
                  value={startingOn}
                  setShowPicker={setOpenStartingOnCalendar}
                  onChange={setStartingOn}
                />
              )}
            </p>
          </div>
          {/* payment */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <RiWalletLine size={24} />

              <p className="text-[17px]">Payment plan</p>
            </div>
            <p className=" font-medium text-[17px] cursor-pointer">
              1 month(rollling)
            </p>
          </div>
          {/* parking access hours */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <MdOutlineTimer size={24} />

              <p className="text-[17px]">Parking access hours</p>
            </div>
            <p className="relative font-medium text-[17px] cursor-pointer">
              {availability} 24h a day
            </p>
          </div>
          {/* first payment */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative w-[24px] h-[24px]">
                <div className="w-[21px] h-[21px] rounded-full border-2 border-black">
                  <span className="absolute top-0 left-1 z-20 text-sm font-medium">
                    Rs
                  </span>
                </div>
              </div>
              <p className="text-[17px]">First payment</p>
            </div>
            <p className="relative font-medium text-[17px] cursor-pointer">
              {firstPayment === "on-starting-day"
                ? `Before ${dateFormator(startingOn, "monthly")}`
                : firstPayment === "before-end-of-the-month"
                ? `Before ${dateFormator(startingOn.getDate() + 30)}`
                : firstPayment === "within-first-week"
                ? `Before ${startingOn.getDate() + 7}`
                : firstPayment === "within-15-days"
                ? `Before${dateFormator(startingOn.getDate() + 15)}`
                : ""}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingDetailsCard;
