import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DateTimePicker = ({
  type,
  value,
  setShowPicker,
  onChange,
  minOffsetHours = 0, // default 0, but you can pass 2 for +2 hrs rule
}) => {
  const now = new Date();

  const pickerRef = useRef(null);
  // Minimum selectable date-time
  const minDateTime = new Date(now.getTime() + minOffsetHours * 60 * 60 * 1000);

  const [selectedDate, setSelectedDate] = useState(value);
  const providedTime =
    String(value.getHours()).padStart(2, "0") +
    ":" +
    String(value.getMinutes()).padStart(2, "0");
  const [time, setTime] = useState(providedTime);

  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  //click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowPicker]);
  // For rendering calendar
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // Check if a date should be disabled
  const isDateDisabled = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < minDateTime.setHours(0, 0, 0, 0);
  };

  // When selecting a day
  const handleSelect = (day) => {
    if (isDateDisabled(day)) return;

    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  // Check if time should be disabled (for today only)
  const isTimeDisabled = (t) => {
    if (!selectedDate) return false;

    const [h, m] = t.split(":");
    const dateWithTime = new Date(selectedDate);
    dateWithTime.setHours(h, m, 0, 0);

    return dateWithTime < minDateTime;
  };

  // Done button handler
  const handleDone = () => {
    const [h, m] = time.split(":");
    const final = selectedDate ? new Date(selectedDate) : new Date(value);
    final.setHours(h);
    final.setMinutes(m);
    if (final < minDateTime) return; // safety

    onChange(final);
    setShowPicker(false);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  const prevMonth = () => {
    const isSameMonth =
      currentMonth === now.getMonth() && currentYear === now.getFullYear();

    if (isSameMonth) return; // don't go to past months

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  return (
    <div
      ref={pickerRef}
      className={`absolute top-full z-50 w-[280px] rounded shadow 
        "
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <div className=" bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="disabled:opacity-30 ">
            <ChevronLeft size={20} className="text-[#1fa637] cursor-pointer" />
          </button>

          <h2 className="font-medium text-lg">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentYear}
          </h2>

          <button onClick={nextMonth} className="text-[#1fa637] cursor-pointer">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-xs text-gray-500 mb-2 text-center">
          {weekDays.map((d) => (
            <div key={d} className="font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty slots */}
          {Array(firstDayIndex)
            .fill(null)
            .map((_, i) => (
              <div key={i}></div>
            ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const disabled = isDateDisabled(day);

            // Check if this specific day is actually today
            const isToday =
              day === now.getDate() &&
              currentMonth === now.getMonth() &&
              currentYear === now.getFullYear();

            const isSelected =
              selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear;

            return (
              <div
                key={day}
                onClick={() => !disabled && handleSelect(day)}
                className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-sm
                ${
                  disabled
                    ? "text-gray-300 cursor-default"
                    : "hover:bg-[#1fa637] "
                }
                ${isSelected ? "bg-[#1fa637] text-white" : ""}
                ${isToday ? "border border-[#1fa637]" : ""}
              `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between py-2 px-3 gap-3 bg-[#fafafa]">
        {/* Time Input */}
        <label className="text-[14px] text-gray-600">Enter after</label>
        <div>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-20 border border-[#ccc] cursor-pointer rounded p-2"
          >
            {Array.from({ length: 48 }).map((_, i) => {
              const h = Math.floor(i / 2)
                .toString()
                .padStart(2, "0");
              const m = i % 2 === 0 ? "00" : "30";
              const timeVal = `${h}:${m}`;
              const disabled = isTimeDisabled(timeVal);

              return (
                <option key={i} value={timeVal} disabled={disabled}>
                  {timeVal}
                </option>
              );
            })}
          </select>
        </div>

        {/* Done Button */}
        <button
          onClick={handleDone}
          className="w-20 bg-[#1fa637] text-white font-semibold py-2 rounded cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DateTimePicker;
