// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css"; // ← CRITICAL: Don't forget this!
// import { useState, useCallback } from "react";

// // Fix default marker icon issue in React/Webpack (run once)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const SearchMap = ({ lat, lon, lots = [] }) => {
//   // Fix: Initialize as null (not false) for proper ID comparison
//   const [hoveredId, setHoveredId] = useState(null);

//   const KATHMANDU_BOUNDS = [
//     [27.55, 85.2],
//     [27.85, 85.55],
//   ];

//   // Memoized icon creators (performance boost)
//   const createParkingPriceIcon = useCallback((price, isHovered = false) => {
//     return L.divIcon({
//       className: "",
//       html: `
//         <div style="
//           background: ${isHovered ? "#1e40af" : "#000000"};
//           color: white;
//           font-weight: bold;
//           font-size: 14px;
//           padding: 8px 14px;
//           border-radius: 30px;
//           border: 3px solid white;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.4);
//           min-width: 60px;
//           text-align: center;
//           position: relative;
//           transform: ${isHovered ? "scale(1.15)" : "scale(1)"};
//           transition: all 0.2s ease;
//         ">
//           Rs ${price}
//           <!-- Tail (speech bubble pointer) -->
//           <div style="
//             position: absolute;
//             bottom: -10px;
//             left: 50%;
//             margin-left: -10px;
//             width: 0;
//             height: 0;
//             border-left: 10px solid transparent;
//             border-right: 10px solid transparent;
//             border-top: 12px solid ${isHovered ? "#1e40af" : "#000000"};
//           "></div>
//           <div style="
//             position: absolute;
//             bottom: -14px;
//             left: 50%;
//             margin-left: -12px;
//             width: 0;
//             height: 0;
//             border-left: 12px solid transparent;
//             border-right: 12px solid transparent;
//             border-top: 14px solid white;
//           "></div>
//         </div>
//       `,
//       iconSize: [80, 50],
//       iconAnchor: [40, 55],
//     });
//   }, []);

//   const userLocationIcon = L.divIcon({
//     className: "",
//     html: `
//       <div style="
//         width: 36px;
//         height: 36px;
//         background: #4285F4;
//         border-radius: 50% 50% 50% 0;
//         border: 4px solid white;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.4);
//         transform: rotate(-45deg);
//         position: relative;
//       ">
//         <div style="
//           width: 12px;
//           height: 12px;
//           background: white;
//           border-radius: 50%;
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%) rotate(45deg);
//         "></div>
//         <div style="
//           position: absolute;
//           bottom: -12px;
//           left: 50%;
//           margin-left: -8px;
//           width: 16px;
//           height: 16px;
//           background: rgba(0,0,0,0.3);
//           border-radius: 50%;
//           filter: blur(4px);
//         "></div>
//       </div>
//     `,
//     iconSize: [36, 48],
//     iconAnchor: [18, 48],
//   });

//   // Memoized event handlers (prevents unnecessary re-renders)
//   const handleMouseOver = useCallback((lotId) => {
//     setHoveredId(lotId);
//   }, []);

//   const handleMouseOut = useCallback(() => {
//     setHoveredId(null);
//   }, []);

//   return (
//     <div className="flex-1 relative">
//       <MapContainer
//         center={[lat, lon]}
//         zoom={17}
//         minZoom={12}
//         maxZoom={22} // Max zoom for MapTiler
//         maxBounds={KATHMANDU_BOUNDS}
//         maxBoundsViscosity={1.0}
//         className="h-full w-full"
//       >
//         <TileLayer
//           url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=lDArxDtLYzrNm4KC4TvA"
//           attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           tileSize={512}
//           zoomOffset={-1}
//           maxNativeZoom={22} // Prevents gray tiles beyond native resolution
//         />

//         {/* User/Searched Location Marker */}
//         {lat && lon && (
//           <Marker position={[lat, lon]} icon={userLocationIcon}>
//             <Popup>You are here / Search location</Popup>
//           </Marker>
//         )}

//         {/* Parking Lot Markers - NOW WITH WORKING HOVER */}
//         {lots.map((lot) => (
//           <Marker
//             key={lot._id.toString()} // Ensure string for proper key
//             position={[
//               lot.location.coordinates[1], // lat
//               lot.location.coordinates[0], // lng
//             ]}
//             icon={createParkingPriceIcon(
//               lot.pricePerHour || 200,
//               hoveredId === lot._id
//             )}
//             eventHandlers={{
//               mouseover: () => handleMouseOver(lot._id),
//               mouseout: handleMouseOut,
//             }}
//           >
//             <Popup>
//               <div className="min-w-[200px] p-3">
//                 <h3 className="font-bold text-lg mb-1">{lot.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{lot.address}</p>
//                 <p className="font-semibold text-lg">
//                   Rs {lot.pricePerHour}/hr
//                 </p>
//                 <p className="text-green-600 font-medium">
//                   {lot.availableSlots || 0} slots left
//                 </p>
//                 {lot.avgRating && (
//                   <p className="text-xs text-yellow-600 mt-1">
//                     ⭐ {lot.avgRating} ({lot.totalRatings || 0} reviews)
//                   </p>
//                 )}
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default SearchMap;
import {
  Map,
  NavigationControl,
  Marker,
  Popup,
  MapStyle,
  config,
} from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef } from "react";

config.apiKey = import.meta.env.VITE_MAPTILER_KEY || "YOUR_KEY_HERE";

const SearchMap = ({ lat, lon, lots = [] }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({}); // Using an object to track markers by ID

  // Helper: User blue pin
  const createUserPinElement = () => {
    const el = document.createElement("div");
    el.className = "user-marker";
    el.innerHTML = `
      <div style="width: 36px; height: 36px; background: #4285F4; border-radius: 50% 50% 50% 0; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); transform: rotate(-45deg); position: relative;">
        <div style="width: 12px; height: 12px; background: white; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg);"></div>
      </div>`;
    return el;
  };

  // Helper: Parking price bubble
  const createPriceMarkerElement = (price) => {
    const el = document.createElement("div");
    el.className = "price-marker"; // Add a class for easy CSS selection
    el.innerHTML = `
      <div class="price-bubble" style="background: #ffffff; color: #212121; font-weight: bold; font-size: 14px; padding: 8px 14px; border-radius: 30px; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); min-width: 60px; text-align: center; position: relative; transition: all 0.2s ease; cursor: pointer;">
        Rs ${price}
        <div class="arrow" style="position: absolute; bottom: -10px; left: 50%; margin-left: -10px; width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 12px solid #ffffff;"></div>
      </div>`;
    return el;
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = new Map({
        container: mapContainer.current,
        style: MapStyle.STREETS,
        center: [lon, lat],
        zoom: 17,
        pitch: 0,
        terrain: true,
      });

      // User location marker (one-time)
      new Marker({ element: createUserPinElement() })
        .setLngLat([lon, lat])
        .addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Remove only markers that are no longer in the "lots" array
    Object.keys(markersRef.current).forEach((id) => {
      if (!lots.find((l) => l._id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add new markers
    lots.forEach((lot) => {
      if (!markersRef.current[lot._id]) {
        const el = createPriceMarkerElement(lot.pricePerHour || 200);
        const innerBubble = el.querySelector(".price-bubble");
        const arrow = el.querySelector(".arrow");

        const marker = new Marker({ element: el })
          .setLngLat([lot.location.coordinates[0], lot.location.coordinates[1]])
          .addTo(map);

        // Handle hover via direct DOM to avoid React re-renders
        el.addEventListener("mouseenter", () => {
          innerBubble.style.background = "#1fa637";
          innerBubble.style.transform = "scale(1.15)";
          arrow.style.borderTopColor = "#1fa637";
        });
        el.addEventListener("mouseleave", () => {
          innerBubble.style.background = "#ffffff";
          innerBubble.style.transform = "scale(1)";
          arrow.style.borderTopColor = "#ffffff";
        });

        const popup = new Popup({ offset: 25 }).setHTML(`
          <div style="padding: 10px; text-align: center;">
            <h3 style="font-weight: bold;">${lot.name}</h3>
            <p>Rs ${lot.pricePerHour}/hr</p>
            <p style="color: green;">${lot.availableSlots} slots left</p>
          </div>`);

        marker.setPopup(popup);
        markersRef.current[lot._id] = marker;
      }
    });
  }, [lots, lat, lon]); // Removed hoveredId from here

  return (
    <div className="flex-1">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default SearchMap;
