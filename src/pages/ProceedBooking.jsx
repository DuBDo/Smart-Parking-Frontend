import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import SearchNavBar from "../components/SearchNavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import BookingDetailsCard from "../components/parking_and_booking/BookingDetailsCard";
import { MdError } from "react-icons/md";
import ContactInfo from "../components/parking_and_booking/ContactInfo";
import VehicleInfo from "../components/parking_and_booking/VehicleInfo";
import ParkingDetailsCard from "../components/parking_and_booking/ParkingDetailsCard";
import ProceedBookingModal from "../components/ui/ProceedBookingModal";

const ProceedBooking = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  const { id } = useParams();

  const [params] = useSearchParams();
  const bookingType = params.get("bookingType");
  const fromDate = params.get("from");
  const untilDate = params.get("until");
  const startingOnDate = params.get("startingOn");
  const availability = params.get("availability");

  const [parkingLot, setParkingLot] = useState(null);
  const [loading, setLoading] = useState(true);

  const [from, setFrom] = useState(new Date(fromDate));
  const [until, setUntil] = useState(new Date(untilDate));
  const [duration, setDuration] = useState();
  const [startingOn, setStartingOn] = useState(new Date(startingOnDate));
  const [error, setError] = useState(null);

  const [mobile, setMobile] = useState(user.mobile || null);

  const [totalPrice, setTotalPrice] = useState();

  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (from < new Date() || until < new Date()) {
      setError("The date chosen has already passed");
    }
    if (from < until) {
      setError("Leaving time must be before arriving time");
    }
    setError(null);
    if (bookingType == "hourly/daily") {
      const price = (parkingLot?.pricePerHour * duration?.totalMinutes) / 60;

      setTotalPrice(Number(price.toFixed(2)));
    } else {
      setTotalPrice(parkingLot?.monthlyPrice);
    }
  }, [duration, from, until]);

  const BACKEND = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND}/api/V1/parking-lot/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setParkingLot(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleBooking = async () => {
    try {
      const bookingDetails = {
        parkingLotId: parkingLot._id,
        fromTime: JSON.stringify(from),
        untilTime: JSON.stringify(until),
        vehiclePlate: user.vehicle[0]?.plate,
      };
      const { data } = await axios.post(
        `${BACKEND}/api/V1/booking`,
        bookingDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setResponse("success");
      setOpenModal(true);
      console.log(data, openModal, response);
    } catch (error) {
      console.log(error);
      setResponse("failed");
      setOpenModal(true);
    }
  };

  return (
    <>
      <SearchNavBar />
      {!loading && (
        <div className="px-auto flex justify-center bg-[#f3f7f9]">
          {/* left part */}
          <div className="flex flex-col">
            <h1 className=" my-8 text-[#212121] text-3xl font-medium">
              {user.firstName}, confirm your booking
            </h1>
            <div className="flex justify-center gap-9">
              <div className="w-[600px] flex flex-col gap-9">
                <BookingDetailsCard
                  type={bookingType}
                  from={from}
                  setFrom={setFrom}
                  until={until}
                  setUntil={setUntil}
                  startingOn={startingOn}
                  setStartingOn={setStartingOn}
                  availability={availability}
                  firstPayment={parkingLot?.firstPayment || "on-starting-day"}
                  duration={duration}
                  setDuration={setDuration}
                />

                {error && (
                  <div className="w-full h-14 pl-4 py-3.5 flex gap-5 rounded bg-[#eef9ff] border border-[#2f9fed]">
                    <MdError size={28} className="text-[#6fbdfe]" />
                    <div>{error}</div>
                  </div>
                )}
                <ContactInfo mobile={mobile} setMobile={setMobile} />
                <VehicleInfo
                  brand={user?.vehicle[0]?.brand}
                  numberPlate={user?.vehicle[0]?.plate}
                />
                {/* <div className="w-full p-8 flex flex-col gap-6 bg-white border border-[#dddddd] rounded-lg">
                  <h2 className="text-[#212121] text-2xl font-medium">
                    Pay now and reserve
                  </h2>
                  <p className="text-[#9e9e9e]">
                    You need to pay the charges first to reserve your spot
                  </p>
                  <div className="flex items-center gap-8">
                    <button
                      className="bg-[#1fa637] h-[80px] font-bold text-white rounded-md cursor-pointer"
                      onClick={handleEsewaPay}
                    >
                      <img src={esewa} alt="" className="h-[50px] w-[210px]" />
                    </button>
                    <button className=" text-white rounded-md cursor-pointer">
                      <img src={khalti} alt="" className="w-[250px]" />
                    </button>
                  </div>

                  
                </div> */}

                {/* create booking button  */}
                <button
                  className="py-3 mb-14 text-lg bg-[#1fa637] font-bold text-white rounded-md cursor-pointer"
                  onClick={handleBooking}
                >
                  Reserve your slot
                </button>
              </div>
              {/* right parts */}
              <div className="w-[440px]">
                <ParkingDetailsCard
                  bookingType={bookingType}
                  images={parkingLot?.images}
                  name={parkingLot?.name}
                  rating={parkingLot?.rating}
                  totalRatings={parkingLot?.totalRatings}
                  pricePerHour={parkingLot?.pricePerHour}
                  monthlyPrice={parkingLot?.monthlyPrice}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                />
              </div>
            </div>
          </div>
          {openModal && (
            <ProceedBookingModal
              type={response}
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onConfirm={() => {
                setOpenModal(false);
                navigate("/dashboard/bookings-made");
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProceedBooking;
