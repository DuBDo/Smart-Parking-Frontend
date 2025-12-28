import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

import DateTimePicker from "./ui/DateTimePicker";
import dateFormator from "../utils/dateFormator";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "./ui/DatePicker";
import AvailabilityDropdown from "./ui/AvailabilityDropdown";
import { geocoding } from "@maptiler/sdk";
import { LuSend } from "react-icons/lu";
import { MapPin } from "lucide-react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const TopSearchFilter = ({
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
  onSearch,
}) => {
  const [searhloading, setSearchLoading] = useState(false);

  const [showAvailabilityDropdown, setShowAvailabilityDropdown] =
    useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [picked, setPicked] = useState(null);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  //arko bata
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //for controling the loading of fetching data
  const dropdownRef = useRef(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("map_history") || "[]");
    setHistory(Array.isArray(saved) ? saved : []);

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
  const NEPAL_BOUNDS = [80.058, 26.347, 88.201, 30.447];
  const handleLocationSearch = async (val) => {
    setSearch(val);
    if (val.length < 2) {
      setResults([]);
      return;
    }
    try {
      const result = await geocoding.forward(val, {
        bbox: NEPAL_BOUNDS,
        limit: 6,
        autocomplete: true, // Optimizes for typing
        fuzzyMatch: true, // Helps with typos
        types: ["poi", "address", "municipality", "locality", "neighbourhood"],
      });
      // MapTiler returns a GeoJSON FeatureCollection
      // console.log(result.features);
      setResults(result.features || []);
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
          // Use MapTiler SDK instead of Axios/Nominatim
          const result = await geocoding.reverse([longitude, latitude], {
            limit: 1,
            types: ["poi", "address", "neighbourhood", "locality"],
          });

          if (result.features && result.features.length > 0) {
            // feature_name or place_name gives a more concise label than Nominatim's massive string
            const placeName = result.features[0].place_name;
            setSearch(placeName);
          }
          setShowDropdown(false);
        } catch (error) {
          console.error("Error fetching location name:", error);
          setSearch(
            `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          );
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        alert("Unable to retrieve your location. Please check permissions.");
        setIsLoading(false);
      }
    );
  };
  const selectLocation = (loc, isFromHistory = false) => {
    const [lon, lat] = loc.geometry.coordinates;
    const name = loc.place_name || loc.display_name;
    setLat(lat);
    setLon(lon);
    setSearch(name);
    setShowDropdown(false);
    if (!isFromHistory) {
      const newEntry = {
        id: loc.id,
        place_name: name,
        geometry: loc.geometry,
        isFavorite: false,
        timestamp: Date.now(),
      };
      const updatedHistory = [
        newEntry,
        ...history.filter((h) => h.id !== loc.id),
      ].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("map_history", JSON.stringify(updatedHistory));
    }
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    const updated = history.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setHistory(updated);
    localStorage.setItem("map_history", JSON.stringify(updated));
  };
  // Sort history: Favorites first, then by timestamp
  const sortedHistory = [...history].sort(
    (a, b) => b.isFavorite - a.isFavorite
  );
  //min 1hrs of difference
  useEffect(() => {
    if (until <= from) {
      setUntil(new Date(from.getTime() + 1 * 60 * 60 * 1000));
    }
  }, [from]);

  useEffect(() => {
    if (from >= new Date(until.getTime() - 1 * 60 * 60 * 1000)) {
      setFrom(new Date(until.getTime() - 1 * 60 * 60 * 1000));
    }
  }, [until]);

  return (
    <div className="h-auto shadow-md">
      <div className="min-h-16 px-2 py-2 flex gap-2.5">
        <div
          ref={dropdownRef}
          className=" relative  flex-1 pl-3.5 py-2 border border-[#cccccc] rounded "
        >
          <div className=" flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <span className="text-sm text-[#2cab43]">Park at</span>
              <input
                type="text"
                className="font-semibold placeholder-[#cccccc] focus:outline-0 w-full"
                placeholder="Enter location or location ID"
                value={search}
                autoComplete="off"
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => handleLocationSearch(e.target.value)}
              />
            </div>

            <div
              className="w-14 flex justify-center items-center"
              onClick={() => onSearch(lat, lon)}
            >
              <IoSearch size={28} className="text-[#cccccc] cursor-pointer" />
            </div>
          </div>
          {/* Dropdown Logic */}
          {showDropdown && (
            <div className=" absolute top-[110%] left-0 w-full z-10 px-4 rounded border bg-white border-[#efefef] max-h-80 overflow-y-auto shadow-lg">
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
              {search.length >= 2 && results.length > 0 ? (
                results.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => selectLocation(res)}
                    className="w-full text-left py-3 hover:bg-blue-50 flex items-start gap-3 transition cursor-pointer"
                  >
                    <MapPin className="text-[#3685d4] w-5 h-5 mt-1 shrink-0" />
                    <span className="text-base text-gray-600 truncate">
                      {res.place_name ||
                        place_name_en
                          .split(",")
                          .map((part) => part.trim())
                          .slice(0, 3)
                          .join(", ")}
                    </span>
                  </button>
                ))
              ) : (
                <>
                  <p className="text-[#7e7e7e] font-semibold text-sm mt-4">
                    Recent searches
                  </p>
                  {sortedHistory.map((item) => {
                    if (!item.place_name) return null;
                    return (
                      <button
                        key={item.id}
                        onClick={() => selectLocation(item, true)}
                        className="w-full text-left py-3 hover:bg-gray-50 flex items-center justify-between group transition cursor-pointer"
                      >
                        <div className="flex flex-1 items-center gap-3 truncate">
                          <span className="text text-gray-600 truncate">
                            {item.place_name}
                          </span>
                        </div>

                        {item.isFavorite ? (
                          <GoHeartFill
                            onClick={(e) => toggleFavorite(e, item.id)}
                            size={24}
                            className=" text-[#1fa637] cursor-pointer"
                          />
                        ) : (
                          <GoHeart
                            onClick={(e) => toggleFavorite(e, item.id)}
                            size={24}
                            className=" text-gray-300 cursor-pointer"
                          />
                        )}
                      </button>
                    );
                  })}
                </>
              )}
            </div>
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
