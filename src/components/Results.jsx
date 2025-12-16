import React, { useState } from "react";
import { search } from "../constants/universal";
import SearchResultCard from "./search/SearchResultCard";
import { useNavigate } from "react-router";

const Results = ({ query, results }) => {
  console.log(results);
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState(
    results.length > 0 ? results : search
  );

  const filterTabs = ["cheapest", "closest"];
  const [searchType, setSearchType] = useState("cheapest");

  const params = new URLSearchParams(query);
  const q = params.toString();

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
    <div className={`h-full w-1/3 flex flex-col`}>
      <div className="flex justify-evenly text-base font-[400] border-b border-b-[#ccc]">
        {/* <button>Recommended</button> */}
        <button
          className={`py-5 w-1/2 cursor-pointer ${
            searchType == "cheapest" ? "font-bold text-[#1fa637]" : ""
          }`}
          onClick={() => setSearchType("cheapest")}
        >
          Cheapest
        </button>
        <button
          className={`py-5 w-1/2 cursor-pointer ${
            searchType == "closest" ? "font-bold text-[#1fa637]" : ""
          }`}
          onClick={() => setSearchType("closest")}
        >
          Closest
        </button>
      </div>
      <div className="px-4 py-3 overflow-y-scroll">
        <div className="h-auto flex flex-col gap-4 ">
          {searchResult.map((lot, idx) => (
            <SearchResultCard
              id={lot._id}
              name={lot.name}
              address={lot.address}
              image={lot.image[0]}
              rating={lot.avgRating}
              totalRatings={lot.totalRatings}
              totalBookings={lot.totalBookings}
              durationToDestination={lot.duration}
              price={lot.price}
              evCharger={lot.evCharger}
              onReserve={handleBooking}
              onClick={() => {
                handleCardClicked(lot._id);
              }}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
