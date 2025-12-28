import React, { useEffect, useState } from "react";
import { search } from "../constants/universal";
import SearchResultCard from "./search/SearchResultCard";
import { useNavigate } from "react-router";
import Spinner from "../components/ui/Spinner";

const Results = ({ loading, query, results, setHovered }) => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState(results || []);

  const [searchType, setSearchType] = useState("closest"); //closest, cheapest

  const params = new URLSearchParams(query);
  const q = params.toString();

  useEffect(() => {
    setSearchResult(results);
  }, [results]);

  const getSortedLots = (lotsArray) => {
    // Create a copy to avoid mutating the original array
    const sorted = [...lotsArray];

    if (searchType === "cheapest") {
      return sorted.sort((a, b) => {
        // Primary sort: Price
        if (a.pricePerHour !== b.pricePerHour) {
          return a.pricePerHour - b.pricePerHour;
        }
        // Secondary sort: If prices are equal, show the closer one first
        return a.travelTime - b.travelTime;
      });
    }
    // Default: Fastest (travel time)
    return sorted.sort((a, b) => a.travelTime - b.travelTime);
  };

  // Use this in your render:
  useEffect(() => {
    setSearchResult(getSortedLots(searchResult));
  }, [searchType]);

  const handleCardClicked = (id) => {
    navigate(`/lot/${id}?${q}`);
  };

  const handleBooking = (id) => {
    query.parkingLot;
    const params = new URLSearchParams(query);
    const q = params.toString();
    navigate(`/proceed-booking/${id}?${q}`);
  };

  return (
    <div className={`h-full w-[402px] flex flex-col`}>
      <div className="flex justify-evenly text-base font-[400] border-b border-b-[#ccc]">
        {/* <button>Recommended</button> */}
        <button
          className={`py-5 w-1/2 cursor-pointer ${
            searchType == "closest" ? "font-bold text-[#1fa637]" : ""
          }`}
          onClick={() => setSearchType("closest")}
        >
          Closest
        </button>
        <button
          className={`py-5 w-1/2 cursor-pointer ${
            searchType == "cheapest" ? "font-bold text-[#1fa637]" : ""
          }`}
          onClick={() => setSearchType("cheapest")}
        >
          Cheapest
        </button>
      </div>
      <div className="px-4 py-3 overflow-y-scroll">
        {!loading && results.length > 0 && (
          <div className="h-auto flex flex-col gap-4 ">
            {searchResult.map((lot, idx) => (
              <SearchResultCard
                id={lot._id}
                name={lot.name}
                address={lot.address}
                image={lot.images[0]}
                rating={lot.avgRating}
                totalRatings={lot.totalRatings}
                totalBookings={lot.totalBookings}
                durationToDestination={lot.travelTime}
                price={lot.pricePerHour}
                evCharger={lot.evCharger}
                onReserve={handleBooking}
                onClick={() => {
                  handleCardClicked(lot._id);
                }}
                setHovered={setHovered}
                key={idx}
              />
            ))}
          </div>
        )}
        {!loading && results.length == 0 && (
          <div className="mt-15 min-w-[350px] h-full flex flex-col items-center text-[#212121]">
            <h2 className="text-xl font-semibold text-center">
              No exact matches
            </h2>
            <p className=" text-center">
              Your search did not return any nearby results. Either all spaces
              are booked for your search times and filter selection or there are
              no JustPark spaces in this area yet.
            </p>
          </div>
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Results;
