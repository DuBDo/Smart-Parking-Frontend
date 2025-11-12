import React from 'react'
import { Link } from 'react-router'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

import { FaTiktok } from "react-icons/fa";
import { Mail, Phone } from 'lucide-react';


function Footer() {
    return (
        <div className='w-full pt-8 px-25 bg-[#1f2438] text-white '>
            <div className='flex justify-between items-start'>
                {/* First Div  */}
                <div className='flex max-w-48 flex-col h-72'>
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-extrabold ">
                        Smart<span className="font-bold ">Park</span>
                    </Link>
                    <p className='mt-10  font-semibold text-3xs'>Your spot, just a tap away</p>

                    <div className='flex-1 flex items-end justify-between'>
                        <FaFacebook size={24} />

                        <FaInstagram size={25} />
                        <AiFillTwitterCircle size={25} />
                        <FaTiktok size={22} />
                    </div>
                </div>

                {/* second div  */}
                <div className='max-w-48 flex flex-col h-80'>
                    <h1 className='text-2xl font-medium mt-2 mb-5'>Information</h1>
                    <div className='flex flex-col gap-2 text-gray-200'>
                        <Link to={'/about-us'} className='hover:text-gray-300 transition-colors'>About us</Link>
                        <Link to={'/how-it-works'} className='hover:text-gray-300 transition-colors'>How it works</Link>
                        <Link to={'/blog'} className='hover:text-gray-300 transition-colors'>Blog</Link>
                    </div>
                </div>
                {/* Third Div  */}
                <div className='max-w-48 flex flex-col h-80'>
                    <h1 className='text-2xl font-medium mt-2 mb-5'>Sevices</h1>
                    <div className='flex flex-col gap-2 text-gray-200'>
                        <Link to={'#'} className='hover:text-gray-300 transition-colors'>Find parking nearby</Link>
                        <Link to={'#'} className='hover:text-gray-300 transition-colors'>Reserve a parking spot</Link>
                        <Link to={'/dashboard/rent-space'} className='hover:text-gray-300 transition-colors'>Rent out your spot</Link>
                        <Link to={'#'} className='hover:text-gray-300 transition-colors'>Online payment</Link>
                        <Link to={'/dashboard'} className='hover:text-gray-300 transition-colors'>Owner dashboard</Link>
                    </div>
                </div>

                {/* Fourth Div  */}
                <div className='max-w-48 flex flex-col h-80'>
                    <h1 className='text-2xl font-medium mt-2 mb-5'>Point of interest</h1>
                    <div className='flex flex-col gap-2 text-gray-200'>
                        <Link to={'/dashboard/airports'} className='hover:text-gray-300 transition-colors'>Airports</Link>
                        <Link to={'#'} className='hover:text-gray-300 transition-colors'>Shopping malls</Link>
                        <Link to={'#'} className='hover:text-gray-300 transition-colors'>Stadiums</Link>
                        <Link to={'#'} className='hover:text-gray-300 transition-colors'>Tourist attractions</Link>
                        <Link to={'#'} className='hover:text-gray-300 transition-colors'>Events</Link>
                    </div>
                </div>

                {/* Fifth Div  */}
                <div className='min-w-48 flex flex-col h-80'>
                    <h1 className='text-2xl font-medium mt-2 mb-5'>Get in touch</h1>
                    <div className='flex flex-col gap-2 text-gray-200'>
                        <Link to={'/contact-form'} className='hover:text-gray-300 transition-colors'>Contact form</Link>
                        
                        <a href="mailto:fortheuseofproject@gmail.com" className="flex items-center gap-2 text-[#3685d4]">
                            <Mail size={18} /> fortheuseofproject@gmail.com 
                        </a>
                        
                    <a href="tel:+9779811111111" className="flex items-center gap-2 text-[#3685d4]">
                            <Phone size={18} /> +977 9811111111 
                        </a>
                        <a href="https://www.google.com/maps/place/Universal+Engineering+%26+Science+College+%2F+%E0%A4%AF%E0%A5%81%E0%A4%A8%E0%A4%BF%E0%A4%AD%E0%A4%B0%E0%A5%8D%E0%A4%B8%E0%A4%B2+%E0%A4%87%E0%A4%A8%E0%A5%8D%E0%A4%9C%E0%A4%BF%E0%A4%A8%E0%A4%BF%E0%A4%AF%E0%A4%B0%E0%A4%BF%E0%A4%99+%E0%A4%8F%E0%A4%A3%E0%A5%8D%E0%A4%A1+%E0%A4%B8%E0%A4%BE%E0%A4%87%E0%A4%A8%E0%A5%8D%E0%A4%B8+%E0%A4%95%E0%A4%B2%E0%A5%87%E0%A4%9C/@27.6798343,85.3248942,18z/data=!3m1!4b1!4m6!3m5!1s0x39eb19c7a58ed799:0x891c4bc346357c26!8m2!3d27.6798343!4d85.3264613!16s%2Fg%2F12q4wjdzz?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2">
                           <FaMapMarkerAlt size={18}/> <p className='text-gray-200 font-normal hover:text-gray-300 transition-colors'>View on Google Maps</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer