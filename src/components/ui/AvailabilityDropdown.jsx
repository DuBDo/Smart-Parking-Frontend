import { useEffect, useRef } from "react";

const availabilityOptions = [
  "Every day",
  "Mon-Fri",
  "Any 3 days",
  "Less than a month",
];

export default function AvailabilityDropdown({
  open,
  setOpen,
  selected,
  setSelected,
}) {
  const selectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  return (
    <>
      {/* Dropdown Content */}
      {open && (
        <div
          ref={selectorRef}
          className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-xl p-4 z-50"
        >
          {/* Options list */}
          <div className="flex flex-col">
            {availabilityOptions.map((option) => (
              <div
                key={option}
                className={`flex justify-between items-center cursor-pointer border border-[#ccc] p-3
                  ${
                    option == "Every day"
                      ? "rounded-t-md border-b-0"
                      : option == "Less than a month"
                      ? "border border-b rounded-b-md"
                      : "border-b-0"
                  }
                 `}
                onClick={() => {
                  setSelected(option);
                }}
              >
                <span className="text-gray-700">{option}</span>

                {/* Radio circle */}
                <span
                  className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center ${
                    selected === option ? "border-green-600" : "border-gray-300"
                  }`}
                >
                  {selected === option && (
                    <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Done button */}
          <button
            className="bg-[#1fa637] text-white w-full py-2 rounded-lg font-semibold mt-4 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Done
          </button>
        </div>
      )}
    </>
  );
}
