import { BiSolidCoinStack } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { GoHeart, GoHeartFill } from "react-icons/go";

import hero from "../assets/hero.webp";
import { useEffect, useRef, useState } from "react";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {} from "@mui/x-date-pickers/timeViewRenderers";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { useNavigate } from "react-router";
import axios from "axios";
import { Search, MapPin, Star, Clock } from "lucide-react"; // Icons

function Hero() {
  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState("hourly/daily");

  let currentDate = dayjs();
  const [date, setDate] = useState(dayjs(currentDate));
  const [fromDateAndTime, setFromDateAndTime] = useState(dayjs(currentDate));
  const [untilDateAndTime, setUntilDateAndTime] = useState(
    dayjs(currentDate.add(1, "hour"))
  );
  const [availability, setAvailability] = useState("Sun-Fri");
  const [isAvailabilityClicked, setIsAvailabilityClicked] = useState(false);
  const handleBookingType = (type) => {
    setBookingType(type);
  };

  let fromString = fromDateAndTime.toDate().toISOString();
  let toString = untilDateAndTime.toDate().toISOString();

  //search
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  // Load history from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("map_history") || "[]");
    setHistory(saved);

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search API Call
  const NEPAL_BOUNDS = "80.058,26.347,88.201,30.447";
  const handleLocationSearch = async (val) => {
    setSearch(val);
    if (val.length < 3) {
      setResults([]);
      return;
    }
    try {
      const { data } = await axios(
        `https://nominatim.openstreetmap.org/search?format=json&q=${val}&viewbox=${NEPAL_BOUNDS}&bounded=1&limit=5`
      );
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };
  const handleCurrentLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
        try {
          // Reverse Geocode to get a name for the search bar
          // Using Nominatim (free) or Baato.io for Nepal specifically
          const { data } = await axios(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const placeName = data.display_name;

          // Update UI
          setSearch(placeName);
          setShowDropdown(false);
        } catch (error) {
          console.error("Error fetching location name:", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        alert("Unable to retrieve your location. Please check permissions.");
        setIsLoading(false);
      }
    );
  };
  const selectLocation = (loc, isFromHistory = false) => {
    const { lat, lon, display_name } = loc;
    setLat(lat);
    setLon(lon);
    if (!isFromHistory) {
      const newEntry = { ...loc, isFavorite: false, timestamp: Date.now() };
      const updatedHistory = [
        newEntry,
        ...history.filter((h) => h.place_id !== loc.place_id),
      ].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("map_history", JSON.stringify(updatedHistory));
    }

    setSearch(display_name);
    setShowDropdown(false);
  };

  const toggleFavorite = (e, placeId) => {
    e.stopPropagation();
    const updated = history.map((item) =>
      item.place_id === placeId
        ? { ...item, isFavorite: !item.isFavorite }
        : item
    );
    setHistory(updated);
    localStorage.setItem("map_history", JSON.stringify(updated));
  };
  // Sort history: Favorites first, then by timestamp
  const sortedHistory = [...history].sort(
    (a, b) => b.isFavorite - a.isFavorite
  );

  useEffect(() => {
    setUntilDateAndTime(dayjs(fromDateAndTime.add(1, "hour")));
  }, [fromDateAndTime]);

  const handleSearch = () => {
    const searchData = {
      q: search,
      lat,
      lon,
      bookingtype: bookingType,
    };
    if (bookingType == "monthly") {
      searchData.startingon = date.toDate().toISOString();
      searchData.availabilty = availability;
    }
    if (bookingType === "hourly/daily") {
      searchData.from = fromDateAndTime.toDate().toISOString();
      searchData.until = untilDateAndTime.toDate().toISOString();
    }
    const params = new URLSearchParams(searchData);
    const query = params.toString();
    navigate(`/search?${query}`);
  };
  return (
    <div className=" mx-16">
      <div className="flex gap-12 mt-32 h-[494px]">
        {/* Left Part  */}
        <div className="max-w-1/2 flex flex-col justify-center gap-5">
          <p className="ml-10 text-5xl tracking-wide font-bold">
            <span className="text-[#1fa637]">The smarter way </span>
            to find parking
          </p>
          <div className="ml-10 mt-4 w-auto flex justify-between shrink-0 font-medium">
            <div className="flex items-center gap-1 ">
              <BiSolidCoinStack size={20} className="text-[#419650]" />
              <p>Best price guarantee</p>
            </div>
            <div className="flex items-center gap-1">
              <FaRegHandshake size={20} className="text-[#419650]" />
              <p>Trusted by drivers</p>
            </div>
            <div className="flex items-center gap-1">
              <FaCar size={20} className="text-[#419650]" />
              <p>100s of reservable spaces</p>
            </div>
          </div>
          <p className="ml-10 text-justify">
            Hundreds of reservable spaces located right where you need them.
            Join the community of stress-free parkers with cheaper parking rate.
          </p>

          {/* Box  */}

          <div className="flex flex-col">
            <div className="w-full flex flex-wrap gap-1 p-5 ml-5 border-8 border-[#e6e6e6] rounded-xl">
              <button
                className={`flex-1 font-medium py-3 px-5 cursor-pointer rounded-t-md ${
                  bookingType == "hourly/daily"
                    ? "bg-[#e3f6e6]"
                    : "bg-[#fafafa]"
                }`}
                onClick={() => {
                  handleBookingType("hourly/daily");
                }}
              >
                Hourly/Daily
              </button>
              <button
                className={`flex-1 font-medium py-3 px-5 cursor-pointer rounded-t-md ${
                  bookingType == "monthly" ? "bg-[#e3f6e6]" : "bg-[#fafafa]"
                }`}
                onClick={() => {
                  handleBookingType("monthly");
                }}
              >
                Monthly
              </button>
              {/* Search Bar */}
              <div className=" relative mt-5 border border-[#cccccc] rounded w-full flex justify-between items-center pl-4 py-2">
                <div className="flex flex-col grow">
                  <label htmlFor="search" className="text-[#1fa637] text-base">
                    Park at
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={search}
                    autoComplete="off"
                    onFocus={() => setShowDropdown(true)}
                    onChange={(e) => handleLocationSearch(e.target.value)}
                    placeholder="Enter a place"
                    className="w-full h-6 font-medium focus:outline-0"
                  />
                </div>
                <div className="w-14 h-7 flex justify-center items-center">
                  <IoSearch size={25} className="text-[#cccccc]" />
                </div>
                {/* Dropdown Logic */}
                {showDropdown && (
                  <div className=" absolute top-18 left-0 w-full z-10 px-4 rounded border bg-white border-[#efefef] max-h-80 overflow-y-auto shadow-lg">
                    <div
                      className="flex items-center gap-5 py-4 border-b border-b-[#efefef] text-lg  cursor-pointer"
                      onClick={handleCurrentLocation}
                      disabled={isLoading}
                    >
                      <LuSend size={22} className="text-[#212121]" />
                      <div className="text-[#212121]">
                        {isLoading ? "Locating..." : "Use current location"}
                      </div>
                    </div>
                    {/* Show Results if typing, else show History */}
                    {search.length >= 3 && results.length > 0 ? (
                      results.map((res) => (
                        <button
                          key={res.place_id}
                          onClick={() => selectLocation(res)}
                          className="w-full text-left py-3 hover:bg-blue-50 flex items-start gap-3 transition"
                        >
                          <MapPin className="text-[#3685d4] w-5 h-5 mt-1 shrink-0" />
                          <span className="text-base text-gray-600 truncate">
                            {res.display_name}
                          </span>
                        </button>
                      ))
                    ) : (
                      <>
                        <p className="text-[#7e7e7e] font-semibold text-sm mt-4">
                          Recent searches
                        </p>
                        {sortedHistory.map((item) => (
                          <button
                            key={item.place_id}
                            onClick={() => selectLocation(item, true)}
                            className="w-full text-left py-3 hover:bg-gray-50 flex items-center justify-between group transition"
                          >
                            <div className="flex flex-1 items-center gap-3 truncate">
                              <span className="text text-gray-600 truncate">
                                {item.display_name}
                              </span>
                            </div>
                            {item.isFavorite ? (
                              <GoHeartFill
                                onClick={(e) =>
                                  toggleFavorite(e, item.place_id)
                                }
                                size={25}
                                className="cursor-pointe text-[#1fa637] cursor-pointer"
                              />
                            ) : (
                              <GoHeart
                                onClick={(e) =>
                                  toggleFavorite(e, item.place_id)
                                }
                                size={25}
                                className="cursor-pointe text-gray-300 cursor-pointer"
                              />
                            )}
                          </button>
                        ))}
                      </>
                    )}

                    {/* {search.length < 3 && history.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">
                      Search for a place to see recent history.
                    </div>
                  )} */}
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col">
                {bookingType == "monthly" ? (
                  <div className="flex flex-col md:flex-row md:items-end gap-4">
                    {/* Starting On */}
                    <div className="flex-1">
                      <label className="px-4 block text-base text-[#1fa637] mb-1">
                        Starting on
                      </label>
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            minDate={dayjs()} // 👈 disables all dates before today
                            slotProps={{
                              textField: { fullWidth: true },
                              calendarHeader: {
                                sx: {
                                  "& .MuiPickersCalendarHeader-switchViewButton":
                                    {
                                      display: "none", // Hide the dropdown arrow button
                                    },
                                },
                              },
                            }}
                            views={["month", "day", "hours", "minutes"]}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>

                    {/* Availability */}

                    <div className="flex-1 relative">
                      {/* Label */}
                      <label className="px-4 mt-3 block text-base text-[#1fa637] mb-1">
                        Availability
                      </label>

                      {/* Input Wrapper - Needs to be relative for the arrow, but the dropdown should be outside this if it overlays content */}
                      <div
                        className="relative"
                        // This is still the correct place to toggle the dropdown visibility
                        onClick={() =>
                          setIsAvailabilityClicked(!isAvailabilityClicked)
                        }
                      >
                        {/* Disabled Input Field to display current value */}
                        <div className="w-full border border-gray-300 rounded px-4 py-4 focus:outline-0 cursor-pointer">
                          {availability}
                        </div>
                        {/* Arrow Icon */}
                        <IoIosArrowDown className="absolute right-3 top-5" />
                      </div>

                      {isAvailabilityClicked && (
                        <div className="absolute -left-5 z-10 w-xs p-5 my-6 bg-white border border-gray-300 rounded shadow-2xl">
                          {/* Replace <p> with interactive items */}
                          <p
                            className="px-4 py-3 cursor-pointer border-2 rounded-t-md border-[#dfe1e4] hover:bg-gray-100"
                            onClick={() => {
                              setAvailability("Sun-Fri");
                              setIsAvailabilityClicked(false);
                            }}
                          >
                            Sun-Fri
                          </p>
                          <p
                            className="px-4 py-3 cursor-pointer border-l-2 border-r-2 border-[#dfe1e4] hover:bg-gray-100"
                            onClick={() => {
                              setAvailability("Weekend");
                              setIsAvailabilityClicked(false);
                            }}
                          >
                            Weekend
                          </p>
                          <p
                            className="px-4 py-3 border-2 border-[#dfe1e4] rounded-b-md cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              setAvailability("Everyday");
                              setIsAvailabilityClicked(false);
                            }}
                          >
                            Everyday
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-end gap-4">
                    {/* Starting On */}
                    <div className="flex-1">
                      <label className="px-4 block text-base text-[#1fa637] mb-1">
                        From
                      </label>
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            value={fromDateAndTime}
                            onChange={(newValue) =>
                              setFromDateAndTime(newValue)
                            }
                            minDate={dayjs()}
                            slotProps={{
                              textField: { fullWidth: true },
                              calendarHeader: {
                                sx: {
                                  "& .MuiPickersCalendarHeader-switchViewButton":
                                    {
                                      display: "none", // Hide the dropdown arrow button
                                    },
                                },
                              },
                            }}
                            // --- KEY TO GETTING THIS LIST VIEW ---
                            // Explicitly defining the view renderers for hours and minutes
                            // often defaults to this scrollable list on desktop/wider screens.
                            viewRenderers={{
                              hours: (props) => <DigitalClock {...props} />,
                              minutes: (props) => <DigitalClock {...props} />,
                            }}
                            timeSteps={{ minutes: 30 }}
                            // You can also use the views prop to control the selection order
                            views={["month", "day", "hours", "minutes"]}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>

                    {/* Until */}

                    <div className="flex-1 relative">
                      {/* Label */}
                      <label className="px-4 mt-3 block text-base text-[#1fa637] mb-1">
                        Until
                      </label>

                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            value={untilDateAndTime}
                            onChange={(newValue) =>
                              setUntilDateAndTime(newValue)
                            }
                            minDate={dayjs()}
                            slotProps={{
                              textField: { fullWidth: true },
                              calendarHeader: {
                                sx: {
                                  "& .MuiPickersCalendarHeader-switchViewButton":
                                    {
                                      display: "none", // Hide the dropdown arrow button
                                    },
                                },
                              },
                            }}
                            // --- KEY TO GETTING THIS LIST VIEW ---
                            // Explicitly defining the view renderers for hours and minutes
                            // often defaults to this scrollable list on desktop/wider screens.
                            viewRenderers={{
                              hours: (props) => <DigitalClock {...props} />,
                              minutes: (props) => <DigitalClock {...props} />,
                            }}
                            timeSteps={{ minutes: 30 }}
                            // You can also use the views prop to control the selection order
                            views={["month", "day", "hours", "minutes"]}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                )}
                {/* Button */}
                <div className="mt-6">
                  <button
                    className="w-full cursor-pointer bg-primary text-white bg-[#1fa637] py-4 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-[#09d250] transition"
                    onClick={handleSearch}
                  >
                    Show parking spaces
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Part */}
        <div className="w-1/2 rounded-2xl h-auto overflow-hidden">
          <img src={hero} alt="" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
