import { Map, Marker, Popup, MapStyle, config } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef, useState } from "react";

config.apiKey = import.meta.env.VITE_MAPTILER_KEY;

const SearchMap = ({ lat, lon, setLat, setLng, lots = [], hovered }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef({});

  const redoMarkerRef = useRef(null);
  const [redoPoint, setRedoPoint] = useState(null);

  const [redoSearch, setRedoSearch] = useState(false);
  const [newCenter, setNewCenter] = useState(null);

  const createRedoMarkerElement = (clickedLat, clickedLon) => {
    const el = document.createElement("div");

    el.innerHTML = `
    <div style="
      background:#1fa637;
      color:white;
      padding:8px 14px;
      border-radius:20px;
      font-weight:600;
      cursor:pointer;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(0,0,0,.3)">
      Redo search here
    </div>
  `;

    el.onclick = (e) => {
      e.stopPropagation();
      console.log("Clicked Lat:", lat);
      console.log("Clicked Lon:", lon);

      // call parent setters
      setLat(clickedLat);
      setLng(clickedLon);
    };

    return el;
  };

  /* ------------------ MARKER HELPERS ------------------ */

  const createUserPinElement = () => {
    const el = document.createElement("div");
    el.onclick = (e) => e.stopPropagation();
    el.innerHTML = `
      <div style="
        width:36px;height:36px;
        background:#4285F4;
        border-radius:50% 50% 50% 0;
        border:4px solid white;
        transform:rotate(-45deg);
        position:relative;
        box-shadow:0 2px 8px rgba(0,0,0,.4)">
        <div style="
          width:12px;height:12px;
          background:white;
          border-radius:50%;
          position:absolute;
          top:50%;left:50%;
          transform:translate(-50%,-50%) rotate(45deg)">
        </div>
      </div>
    `;

    if (redoSearch && newCenter) {
      const btn = document.createElement("div");
      btn.innerText = "Redo search here";

      Object.assign(btn.style, {
        position: "absolute",
        top: "-48px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "8px 14px",
        borderRadius: "20px",
        background: "#1fa637",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 6px rgba(0,0,0,.3)",
      });

      btn.onclick = (e) => {
        e.stopPropagation();
        setLat(newCenter.lat);
        setLng(newCenter.lng);
        setRedoSearch(false);
      };

      el.appendChild(btn);
    }

    return el;
  };

  const createPriceMarkerElement = (price) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <div class="price-bubble" style="
        background:#fff;
        padding:8px 14px;
        border-radius:30px;
        font-weight:700;
        cursor:pointer;
        box-shadow:0 4px 12px rgba(0,0,0,.35);
        transition:.2s">
        Rs ${price}
        <div class="arrow" style="
          position:absolute;
          bottom:-10px;
          left:50%;
          margin-left:-10px;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-top:12px solid #fff"></div>
      </div>
    `;
    return el;
  };

  /* ------------------ MAP INIT ------------------ */

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new Map({
      container: mapContainerRef.current,
      style: MapStyle.OUTDOOR_V2,
      center: [lon, lat],
      zoom: 17,
      pitch: 0,
      terrain: true,
    });

    mapRef.current = map;

    // User marker
    userMarkerRef.current = new Marker({
      element: createUserPinElement(),
    })
      .setLngLat([lon, lat])
      .addTo(map);

    map.on("click", (e) => {
      const { lat, lng } = e.lngLat;

      setRedoPoint({ lat, lon: lng });

      if (redoMarkerRef.current) {
        redoMarkerRef.current.remove();
      }

      redoMarkerRef.current = new Marker({
        element: createRedoMarkerElement(lat, lng),
        anchor: "bottom",
      })
        .setLngLat([lng, lat])
        .addTo(map);
    });
  }, []);

  /* ------------------ USER MARKER UPDATE ------------------ */

  useEffect(() => {
    if (!mapRef.current || !userMarkerRef.current) return;

    if (!redoSearch) return;

    userMarkerRef.current.remove();

    userMarkerRef.current = new Marker({
      element: createUserPinElement(),
    })
      .setLngLat([lon, lat])
      .addTo(mapRef.current);
  }, [redoSearch]);

  /* ------------------ PARKING MARKERS ------------------ */

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    Object.keys(markersRef.current).forEach((id) => {
      if (!lots.some((l) => l._id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add new ones
    lots.forEach((lot) => {
      if (markersRef.current[lot._id]) return;

      const el = createPriceMarkerElement(lot.pricePerHour || 200);
      const bubble = el.querySelector(".price-bubble");
      const arrow = el.querySelector(".arrow");

      el.onmouseenter = () => {
        bubble.style.background = "#1fa637";
        bubble.style.transform = "scale(1.15)";
        arrow.style.borderTopColor = "#1fa637";
      };
      el.onmouseleave = () => {
        bubble.style.background = "#fff";
        bubble.style.transform = "scale(1)";
        arrow.style.borderTopColor = "#fff";
      };
      el.onclick = (e) => {
        e.stopPropagation();
      };
      const marker = new Marker({ element: el })
        .setLngLat(lot.location.coordinates)
        .addTo(map);

      markersRef.current[lot._id] = {
        marker,
        bubble,
        arrow,
      };
    });
  }, [lots]);
  //hover
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, obj]) => {
      const { bubble, arrow } = obj;

      if (id === hovered) {
        bubble.style.background = "#1fa637";
        bubble.style.transform = "scale(1.15)";
        arrow.style.borderTopColor = "#1fa637";
      } else {
        bubble.style.background = "#fff";
        bubble.style.transform = "scale(1)";
        arrow.style.borderTopColor = "#fff";
      }
    });
  }, [hovered]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default SearchMap;
