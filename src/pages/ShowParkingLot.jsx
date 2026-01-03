import React, { useState, useEffect, useRef } from "react";
import Rating from "@mui/material/Rating";
import SearchNavBar from "../components/SearchNavBar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircleCheck, ShieldCheck } from "lucide-react";
import { RiCustomerService2Line } from "react-icons/ri";
import * as maptiler from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import ShowReview from "../components/parking_and_booking/ShowReview";
import FAQ from "../components/parking_and_booking/FAQ";
import Footer from "../components/Footer";
import ParkingImageGallery from "../components/parking_and_booking/ParkingImageGallery";
import { FiShield } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCarGarage } from "react-icons/bi";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
// maptiler.config.apiKey = import.meta.env.VITE_MAPTILER_KEY;

const ShowParkingLot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [parking, setParking] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.user);

  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const fetchParkingLot = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BACKEND}/api/V1/parking-lot/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setParking(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchParkingLot();
  }, [id]);

  useEffect(() => {
    if (!parking || !mapContainer.current) return;

    const [lng, lat] = parking.location.coordinates;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    mapRef.current = new maptiler.Map({
      container: mapContainer.current,
      style: maptiler.MapStyle.STREETS_V4,
      center: [lng, lat],
      zoom: 15,
      bearing: -20,
      antialias: true,
      attributionControl: false,

      dragPan: true,
      dragRotate: false,
      scrollZoom: false,
      doubleClickZoom: false,
      keyboard: false,
      touchZoomRotate: false,
    });

    new maptiler.Marker({ color: "#16a34a" })
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [parking]);

  const handleReserve = () => {
    navigate(`/proceed-booking/${id}?${location.search}`);
  };
  return (
    <>
      <SearchNavBar />
      {parking && !loading && (
        <>
          {/* info section  */}
          <div className="py-12 px-20 bg-[#f5f5f5bd] flex justify-center gap-14">
            {/* leftSection */}
            <div className="w-lg flex flex-col gap-[40px]">
              {/* parking lot  */}
              <div className="py-7 px-7 rounded-md border text-[#212226] bg-white border-[#ddd] shadow">
                <p className="text-sm text-[#9e9e9e]">
                  Parking in Kathmand | {parking?.name}{" "}
                </p>
                <h1 className="mt-2 text-3xl font-medium">{parking.name}</h1>
                <h2 className="px-0.5 italic text-lg">{parking?.address}</h2>
                <div className="flex items-center">
                  <Rating
                    name="half-rating-read"
                    defaultValue={parking.avgRating}
                    precision={0.25}
                    size="normal"
                    readOnly
                  />
                  <span className="text-sm text-[#9e9e9e]">
                    {parking.totalBookings} Bookings
                  </span>
                </div>
              </div>
              {/* Image carousel */}
              <ParkingImageGallery images={parking.images} />
              <div className="px-7 py-7 rounded-md border text-[#212226] bg-white border-[#ddd] shadow">
                <h2 className="text-2xl text-[#212121] font-medium">
                  Space description
                </h2>
                <p className="mt-3">
                  *IMPORTANT* Please read you access instructions after booking
                  for more information on how to access the car park
                </p>
                <p className="mt-2.5">
                  Please ensure your vehicle registration number is correct on
                  your booking, as cameras will read this to enable entry/exit.
                </p>
                {parking.description && (
                  <p className="mt-2.5">{parking.description}</p>
                )}
              </div>
              <div className="px-7 py-7 rounded-md border text-[#212226] bg-white border-[#ddd] shadow">
                <h2 className="mb-1.5 text-2xl text-[#212121] font-medium">
                  Reviews about this space
                </h2>

                <ShowReview
                  name="Bhagat Singh"
                  rating={4}
                  ratedDate={new Date("2026-01-03T14:00:00.000Z")}
                  comment="So far cannot fault the ease and accurate use of the JustPark app. Found me 4 parking spaces in different cities for a reasonable cost and the directions, ease of booking and secure areas found near to where I needed to be have been excellent. Long may it continue with future bookings in 2026…"
                />
              </div>
              <FAQ />
            </div>
            {/* rightSection */}
            <div className="w-[420px] flex flex-col gap-[40px]">
              <div className="rounded-md overflow-hidden">
                <div ref={mapContainer} className="w-full h-[420px]" />
              </div>
              {/* owner */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#9a8164] flex justify-center items-center">
                  {parking.owner.avatar ? (
                    <img src={parking.owner.avatar} width={11} height={11} />
                  ) : (
                    <span className="text-white font-bold">
                      {parking.owner.firstName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="">
                  <div className="font-semibold leading-3">
                    {parking.owner.firstName + " " + parking?.owner?.surName}
                  </div>
                  <div className="text-[#9e9e9e]">Owner</div>
                </div>
              </div>
              {/* Highlights */}
              <div className="px-7 py-7 rounded-md border text-[#212226] bg-white border-[#ddd] shadow">
                <h2 className="text-2xl text-[#212121] font-medium">
                  Highlights
                </h2>
                <div className="mt-4 flex gap-3 font-semibold text-[#1fa637]">
                  <ShieldCheck size={24} />
                  <p>Best price guarantee</p>
                </div>
                <div className="mt-4 flex gap-3 font-semibold text-[#1fa637]">
                  <FiShield size={24} />
                  <p>24/7 security</p>
                </div>
                <div className="mt-4 flex gap-3 font-semibold text-[#1fa637]">
                  <FaLocationDot size={24} />
                  <p>Prime location</p>
                </div>
                <div className="mt-4 pb-3 border-b border-b-[#dddddd] flex gap-3 font-semibold text-[#1fa637]">
                  <BiSolidCarGarage size={24} />
                  <p>Covered parking</p>
                </div>
                <div className="mt-4 flex gap-5 font-semibold text-[#3685d4]">
                  <CircleCheck size={23} />
                  <p>Trusted by thousands of drivers</p>
                </div>
                <div className="mt-4 flex gap-5 font-semibold text-[#3685d4]">
                  <RiCustomerService2Line size={23} />
                  <p>Award winning customer support</p>
                </div>
              </div>
              <div
                className="py-3 w-full bg-[#1fa637] text-center text-white font-semibold rounded-b-xl cursor-pointer hover:bg-green-500"
                onClick={handleReserve}
              >
                Reserve a space
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ShowParkingLot;
