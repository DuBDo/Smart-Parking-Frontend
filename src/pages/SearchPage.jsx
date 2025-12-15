import SearchNavBar from "../components/SearchNavBar";
import TopSearchFilter from "../components/TopSearchFilter";
import Results from "../components/Results";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const bookingType = searchParams.get("bookingtype");

  const fromDate = searchParams.get("from");
  const untilDate = searchParams.get("until");
  const startingOnDate = searchParams.get("startingon");
  const availabilityStatus = searchParams.get("availability");
  const q = searchParams.get("q");

  const [from, setFrom] = useState(new Date(fromDate));
  const [until, setUntil] = useState(
    new Date(untilDate) || new Date(from.getTime() + 1 * 60 * 60 * 1000)
  );
  const [startingOn, setStartingOn] = useState(
    new Date(startingOnDate) ?? new Date()
  );
  const [availability, setAvailability] = useState(availabilityStatus || "");
  const [search, setSearch] = useState(q || "");

  const queryData =
    bookingType === "hourly/daily"
      ? {
          bookingType,
          from: from.toISOString(),
          until: until.toISOString(),
          search,
        }
      : {
          bookingType,
          startingOn: startingOn.toISOString(),
          availability,
          search,
        };

  const [results, setResults] = useState([]);

  return (
    <div className="flex flex-col h-[100vh]">
      <SearchNavBar />
      <TopSearchFilter
        setResults={setResults}
        type={bookingType}
        from={from}
        setFrom={setFrom}
        until={until}
        setUntil={setUntil}
        startingOn={startingOn}
        setStartingOn={setStartingOn}
        availability={availability}
        setAvailability={setAvailability}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex flex-1 overflow-y-scroll">
        <Results results={results} query={queryData} />
        <div className="bg-gray-500 flex-1">Map</div>
      </div>
    </div>
  );
};

export default SearchPage;
