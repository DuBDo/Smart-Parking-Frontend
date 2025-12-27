import axios from "axios";

export default async function calculateTravelTimes(
  currentLat,
  currentLng,
  lots
) {
  if (!lots || lots.length === 0) return [];

  //the first coordinate is the START, others are DESTINATIONS
  const coordinates = [
    `${currentLng},${currentLat}`,
    ...lots.map(
      (lot) => `${lot.location.coordinates[0]},${lot.location.coordinates[1]}`
    ),
  ].join(";");

  try {
    //CALL OSRM TABLE SERVICE sources=0 means only calculate FROM the user location
    const { data } = await axios.get(
      `https://router.project-osrm.org/table/v1/driving/${coordinates}?sources=0&annotations=duration`
    );

    if (data.code === "Ok") {
      //data.durations[0] contains an array of times in SECONDS
      //durations[0][0] is user-to-user (0s), so we skip it
      const travelTimes = data.durations[0].slice(1);

      //Merge durations back into the lot objects
      const updatedLots = lots.map((lot, index) => ({
        ...lot,
        travelTime: Math.round(travelTimes[index] / 60), //convert to minutes
      }));

      //sort by shortest time (The feature from the video!)
      return updatedLots.sort((a, b) => a.travelTime - b.travelTime);
    }
  } catch (error) {
    console.error("OSRM table Error:", error);
    return lots; //Return original lots if API fails
  }
}
