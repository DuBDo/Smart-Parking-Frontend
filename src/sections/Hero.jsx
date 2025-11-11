import { BiSolidCoinStack } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import hero from '../assets/hero.webp';
import { useState } from "react";


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Hero() {
    const [bookingType, setBookingType] = useState('hourly/daily');

    let currentDate = new Date();
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(dayjs(currentDate));
    const [availability, setAvailability] = useState("Sun-Fri");
    const [isAvailabilityClicked, setIsAvailabilityClicked] = useState(false);
    const handleBookingType = (type) => {
        setBookingType(type);
    };

    return (
        <div className=' mx-16'>
            <div className='flex gap-12 mt-14 h-[494px]'>
                {/* Left Part  */}
                <div className='max-w-1/2 flex flex-col justify-center gap-5'>
                    <p className='ml-10 text-5xl tracking-wide font-bold'><span className='text-[#1fa637]'>The smarter way </span>
                        to find parking</p>
                    <div className='ml-10 mt-4 w-auto flex justify-between shrink-0 font-medium'>
                        <div className="flex items-center gap-1 ">
                            <BiSolidCoinStack size={20} className="text-[#419650]" />
                            <p>Best price guarantee</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaRegHandshake size={20} className="text-[#419650]" />
                            <p>Trusted by drivers</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaCar size={20} className="text-[#419650]" />
                            <p>100s of reservable spaces</p>
                        </div>
                    </div>
                    <p className="ml-10 text-justify">Hundreds of reservable spaces located right where you need them. Join the community of stress-free parkers with cheaper parking rate.</p>

                    {/* Box  */}
                    <div className="flex flex-col">
                        <div className='w-full flex flex-wrap gap-1 p-5 ml-5 border-8 border-[#1fa637] rounded-xl'>
                            <button className={`flex-1 font-medium py-3 px-5 cursor-pointer rounded-t-md ${bookingType == 'hourly/daily' ? 'bg-[#e3f6e6]' : 'bg-[#fafafa]'}`}
                                onClick={() => { handleBookingType('hourly/daily') }}>
                                Hourly/Daily
                            </button>
                            <button className={`flex-1 font-medium py-3 px-5 cursor-pointer rounded-t-md ${bookingType == 'monthly' ? 'bg-[#e3f6e6]' : 'bg-[#fafafa]'}`}
                                onClick={() => { handleBookingType('monthly') }}>
                                Monthly
                            </button>
                            {/* Search Bar */}
                            <div className="mt-5 border border-[#cccccc] rounded w-full flex justify-between items-center pl-4 py-2">
                                <div className="flex flex-col grow">
                                    <label htmlFor="search" className="text-[#1fa637] text-base">Park at</label>
                                    <input type="text" id="search" placeholder="Enter a place" className="w-full h-6 font-medium focus:outline-0" />
                                </div>
                                <div className="w-14 h-7 flex justify-center items-center">
                                    <IoSearch size={25} className="text-[#cccccc]" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col">

                                <div className="flex flex-col md:flex-row md:items-end gap-4">
                                    {/* Starting On */}
                                    <div className="flex-1">
                                        <label className="px-4 block text-base text-[#1fa637] mb-1">
                                            Starting on
                                        </label>
                                        <div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker value={date}
                                                    onChange={(newValue) => setDate(newValue)}
                                                    minDate={dayjs()} // 👈 disables all dates before today
                                                    slotProps={{
                                                        textField: { fullWidth: true },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div className="flex-1">
                                        <label className="px-4 mt-3 block text-base text-[#1fa637] mb-1">
                                            Availability
                                        </label>
                                        <select
                                            value={availability}
                                            onChange={(e) => setAvailability(e.target.value)}
                                            className="w-full  border border-gray-300 rounded px-4 py-4 focus:outline-0 cursor-pointer"
                                        >
                                            <option className="focus:outline-0 cursor-pointer m-3">Sun-Fri</option>
                                            <option>Weekend</option>
                                            <option>24/7</option>
                                        </select>
                                        <div className="flex-1">
                                            <label className="px-4 mt-3 block text-base text-[#1fa637] mb-1">
                                                Availability
                                            </label>
                                            <div className="relative">
                                                <input className="w-full  border border-gray-300 rounded px-4 py-4 focus:outline-0 cursor-pointer"
                                                    value={availability}
                                                    disabled
                                                    onClick={() => setIsAvailabilityClicked(!isAvailabilityClicked)} />

                                                <IoIosArrowDown className="absolute right-3 top-5" />
                                            </div>
                                            {isAvailabilityClicked &&
                                            <div className="absolute w-2xs">
                                                <p>Sun-Fri</p>
                                                <p>Sun-Fri</p>
                                                <p>Sun-Fri</p>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* Button */}
                                <div className="mt-6">
                                    <button className="w-full cursor-pointer bg-primary text-white bg-[#1fa637] py-4 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-[#09d250] transition">

                                        Show parking spaces
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
                {/* Right Part */}
                <div className="w-1/2 rounded-2xl h-auto overflow-hidden">
                    <img src={hero} alt="" className="object-cover" />
                </div>
            </div>

        </div>
    );
}

export default Hero