import { BiSolidCoinStack } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import hero from '../assets/hero.webp';
import { useState } from "react";

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import {  } from '@mui/x-date-pickers/timeViewRenderers';
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";

function Hero() {
    const [bookingType, setBookingType] = useState('hourly/daily');

    let currentDate = dayjs();
    const [date, setDate] = useState(dayjs(currentDate));
    const [fromDateAndTime, setFromDateAndTime] = useState(dayjs(currentDate));
    const [untilDateAndTime, setUntilDateAndTime] = useState(dayjs(currentDate.add(1, 'hour')));
    const [availability, setAvailability] = useState("Sun-Fri");
    const [isAvailabilityClicked, setIsAvailabilityClicked] = useState(false);
    const handleBookingType = (type) => {
        setBookingType(type);
    };

    return (
        <div className=' mx-16'>
            <div className='flex gap-12 mt-32 h-[494px]'>
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
                                {bookingType == 'hourly/daily' ?
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


                                        <div className="flex-1 relative">
                                            {/* Label */}
                                            <label className="px-4 mt-3 block text-base text-[#1fa637] mb-1">
                                                Availability
                                            </label>

                                            {/* Input Wrapper - Needs to be relative for the arrow, but the dropdown should be outside this if it overlays content */}
                                            <div
                                                className="relative"
                                                // This is still the correct place to toggle the dropdown visibility
                                                onClick={() => setIsAvailabilityClicked(!isAvailabilityClicked)}
                                            >
                                                {/* Disabled Input Field to display current value */}
                                                <div
                                                    className="w-full border border-gray-300 rounded px-4 py-4 focus:outline-0 cursor-pointer"
                                                >{availability}</div>
                                                {/* Arrow Icon */}
                                                <IoIosArrowDown className="absolute right-3 top-5" />
                                            </div>


                                            {isAvailabilityClicked && (
                                                <div className="absolute -left-5 z-10 w-xs p-5 my-6 bg-white border border-gray-300 rounded shadow-2xl">
                                                    {/* Replace <p> with interactive items */}
                                                    <p
                                                        className="px-4 py-3 cursor-pointer border-2 rounded-t-md border-[#dfe1e4] hover:bg-gray-100"
                                                        onClick={() => {
                                                            setAvailability('Sun-Fri');
                                                            setIsAvailabilityClicked(false);
                                                        }}
                                                    >
                                                        Sun-Fri
                                                    </p>
                                                    <p
                                                        className="px-4 py-3 cursor-pointer border-l-2 border-r-2 border-[#dfe1e4] hover:bg-gray-100"
                                                        onClick={() => {
                                                            setAvailability('Weekend');
                                                            setIsAvailabilityClicked(false);
                                                        }}
                                                    >
                                                        Weekend
                                                    </p>
                                                    <p
                                                        className="px-4 py-3 border-2 border-[#dfe1e4] rounded-b-md cursor-pointer hover:bg-gray-100"
                                                        onClick={() => {
                                                            setAvailability('Everyday');
                                                            setIsAvailabilityClicked(false);
                                                        }}
                                                    >
                                                        Everyday
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                    : <div className="flex flex-col md:flex-row md:items-end gap-4">
                                        {/* Starting On */}
                                        <div className="flex-1">
                                            <label className="px-4 block text-base text-[#1fa637] mb-1">
                                                From
                                            </label>
                                            <div>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        value={fromDateAndTime}
                                                        onChange={(newValue) => setFromDateAndTime(newValue)}
                                                        minDate={dayjs()}
                                                        
                                                        slotProps={{
                                                            textField: { fullWidth: true },
                                                        }}

                                                        // --- KEY TO GETTING THIS LIST VIEW ---
                                                        // Explicitly defining the view renderers for hours and minutes 
                                                        // often defaults to this scrollable list on desktop/wider screens.
                                                        viewRenderers={{
                                                            hours: (props) => <DigitalClock {...props} />,
                                                            minutes: (props) => <DigitalClock {...props} />,
                                                        }}
                                                        timeSteps={{ minutes: 30 }}

                                                        // You can also use the views prop to control the selection order
                                                        views={['year', 'month', 'day', 'hours', 'minutes']}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>

                                        {/* Until */}


                                        <div className="flex-1 relative">
                                            {/* Label */}
                                            <label className="px-4 mt-3 block text-base text-[#1fa637] mb-1">
                                                Until
                                            </label>

                                            <div>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        value={untilDateAndTime}
                                                        onChange={(newValue) => setUntilDateAndTime(newValue)}
                                                        minDate={dayjs()}
                                                        slotProps={{
                                                            textField: { fullWidth: true },
                                                        }}

                                                        // --- KEY TO GETTING THIS LIST VIEW ---
                                                        // Explicitly defining the view renderers for hours and minutes 
                                                        // often defaults to this scrollable list on desktop/wider screens.
                                                        viewRenderers={{
                                                            hours: (props) => <DigitalClock {...props} />,
                                                            minutes: (props) => <DigitalClock {...props} />,
                                                        }}
                                                        timeSteps={{ minutes: 30 }}

                                                        // You can also use the views prop to control the selection order
                                                        views={['year', 'month', 'day', 'hours', 'minutes']}
                                                    />
                                                </LocalizationProvider>
                                            </div>


                                        </div>

                                    </div>}
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