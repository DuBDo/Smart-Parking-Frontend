import SearchNavBar from "../components/SearchNavBar";
import TopSearchFilter from "../components/TopSearchFilter";
import Results from "../components/Results";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import calculateTravelTimes from "../utils/calculateTravelTimes";
import SearchMap from "../components/map/SearchMap";

const SearchPage = () => {
  const [pageLoad, setPageLoad] = useState(false);

  const [searchParams] = useSearchParams();

  const bookingType = searchParams.get("bookingtype");

  const fromDate = searchParams.get("from");
  const untilDate = searchParams.get("until");
  const startingOnDate = searchParams.get("startingon");
  const availabilityStatus = searchParams.get("availability");
  const q = searchParams.get("q");

  // location
  const [lat, setLat] = useState(searchParams.get("lat") || null);
  const [lon, setLon] = useState(searchParams.get("lon") || null);

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
  const [mapLoading, setMaploading] = useState(false);

  const { token } = useSelector((state) => state.user);
  const BACKEND = import.meta.env.VITE_BACKEND_URL;
  const fetchData = async () => {
    setMaploading(true);
    try {
      const { data } = await axios.get(
        `${BACKEND}/api/V1/parking-lot?lat=${lat}&lon=${lon}&bookingType=${bookingType}&startTime=${from}&endTime=${until}&availability=${availability}&startiingOn=${startingOn}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("available lots", data.count);
      //add travel times
      const lotsWithTime = await calculateTravelTimes(
        lat,
        lon,
        data.parkingLots
      );
      setResults(lotsWithTime);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoad(false);
      setMaploading(false);
    }
  };
  useEffect(() => {
    fetchData();
    setPageLoad(true);
  }, [lat, lon]);
  return (
    <>
      {!pageLoad ? (
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
            {!mapLoading && (
              <>
                <Results results={results} query={queryData} />
                <SearchMap lat={lat} lon={lon} lots={results} />
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchPage;
