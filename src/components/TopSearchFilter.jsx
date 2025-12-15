import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

import DateTimePicker from "./ui/DateTimePicker";
import dateFormator from "../utils/dateFormator";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "./ui/DatePicker";
import AvailabilityDropdown from "./ui/AvailabilityDropdown";

const TopSearchFilter = ({
  setResults,
  type,
  from,
  setFrom,
  until,
  setUntil,
  availability,
  setAvailability,
  startingOn,
  setStartingOn,
  search,
  setSearch,
}) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searhloading, setSearchLoading] = useState(false);

  const [showAvailabilityDropdown, setShowAvailabilityDropdown] =
    useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState("Mon-Fri");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [picked, setPicked] = useState(null);

  const handleSearch = async () => {
    return;
    setResults(data);
  };
  return (
    <div className="h-auto shadow-md">
      <div className="min-h-16 px-2 py-2 flex gap-2.5">
        <div className="pl-3.5 py-2 border border-[#cccccc] rounded flex-1 flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-sm text-[#2cab43]">Park at</span>
            <input
              type="text"
              className="font-semibold placeholder-[#cccccc] focus:outline-0 w-full"
              placeholder="Enter location or location ID"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          {!searhloading ? (
            <div
              className="w-14 flex justify-center items-center"
              onClick={handleSearch}
            >
              <IoSearch size={28} className="text-[#cccccc]" />
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* for daily/hourly parking */}
        {type == "hourly/daily" && (
          <>
            {/* from */}
            <div className="relative">
              <div
                className="w-2xs px-3.5 py-2 border border-[#cccccc] rounded flex items-center justify-between cursor-pointer"
                onClick={() => {
                  setPicked("from");
                  setShowPicker(!showPicker);
                }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-[#2cab43]">From</span>
                  <div className="font-semibold">{dateFormator(from)}</div>
                </div>
                <div>
                  <IoIosArrowDown size={21} className="" />
                </div>
                {picked == "from" && showPicker && (
                  <DateTimePicker
                    type={picked}
                    value={from}
                    setShowPicker={setShowPicker}
                    onChange={setFrom}
                  />
                )}
              </div>
            </div>
            {/* until */}
            <div className="relative">
              <div
                className="w-2xs px-3.5 py-2 border border-[#cccccc] rounded flex items-center justify-between cursor-pointer"
                onClick={() => {
                  setPicked("until");
                  setShowPicker(!showPicker);
                }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-[#2cab43]">Until</span>
                  <div className="font-semibold">{dateFormator(until)}</div>
                </div>
                <div>
                  <IoIosArrowDown size={21} className="" />
                </div>
                {picked == "until" && showPicker && (
                  <DateTimePicker
                    type={picked}
                    value={until}
                    setShowPicker={setShowPicker}
                    onChange={setUntil}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* for monthly bookings  */}
        {type == "monthly" && (
          <>
            {/* startingOn */}
            <div className="relative">
              <div
                className="w-2xs px-3.5 py-2 border border-[#cccccc] rounded flex items-center justify-between cursor-pointer"
                onClick={() => {
                  setShowDatePicker(!showDatePicker);
                }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-[#2cab43]">Starting on</span>
                  <div className="font-semibold">
                    {dateFormator(startingOn, "date-formator")}
                  </div>
                </div>
                {showDatePicker && (
                  <DatePicker
                    type="search-date-picker"
                    value={startingOn}
                    setShowPicker={setShowDatePicker}
                    onChange={setStartingOn}
                  />
                )}
                <div>
                  <IoIosArrowDown size={21} className="" />
                </div>
              </div>
            </div>

            {/* availability */}
            <div
              className="w-2xs relative px-3.5 py-2 border border-[#cccccc] rounded cursor-pointer"
              onClick={() =>
                setShowAvailabilityDropdown(!showAvailabilityDropdown)
              }
            >
              <div className="flex flex-col">
                <span className="text-sm text-[#2cab43]">Availability</span>
                <div className="font-semibold">{availability}</div>
              </div>
              <div className="absolute right-3 top-5">
                <IoIosArrowDown size={21} className="" />
              </div>
              <div className="w-full max-w-xs">
                {showAvailabilityDropdown && (
                  <AvailabilityDropdown
                    open={showAvailabilityDropdown}
                    setOpen={setShowAvailabilityDropdown}
                    selected={availability}
                    setSelected={setAvailability}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopSearchFilter;
