
import { useState } from 'react';
import { Link } from 'react-router';

function TopLocations() {
    const [showLocation, setShowLocation] = useState('Popular Attractions')
    const buttons = [
        'Popular Attractions',
        'Cities',
        'Airports',
        'Stadiums'
    ];

    const popularAttractions = [
        { path: '/parking/kathmandu-darbar-squar', location: 'Kathmandu Darbar Squar' },
        { path: '/parking/boudhanath-stupa', location: 'Boudhanath Stupa' },
        { path: '/parking/swayambhunath-temple', location: 'Swayambhunath Temple' },
        { path: '/parking/pashupatinath-temple', location: 'Pashupatinath Temple' },
        { path: '/parking/patan-durbar-square', location: 'Patan Durbar Square ' },
        { path: '/parking/bhaktapur-durbar-square', location: 'Bhaktapur Durbar Square' },
    ];
    const cities = [
        { path: '/parking/kathmandu', city: 'Kathmandu' },
        { path: '/parking/bhaktapur', city: 'Bhaktapur' },
        { path: '/parking/lalitpur', city: 'Lalitpur' },
        { path: '/parking/butwal', city: 'Butwal' },
        { path: '/parking/ghorahi', city: 'Ghorahi' },
        { path: '/parking/nawalpur', city: 'Nawalpur' },
        { path: '/parking/nepalgunj', city: 'Nepalgunj' },
        { path: '/parking/baglung', city: 'Baglung' },
        { path: '/parking/biratnagar', city: 'Biratnagar' },
        { path: '/parking/dhangadhi', city: 'Dhangadhi' },
        { path: '/parking/kanchanpur', city: 'Kanchanpur' },
        { path: '/parking/rupandehi', city: 'Rupandehi' },
        { path: '/parking/janakpur', city: 'Janakpur' },
        { path: '/parking/dharan', city: 'Dharan' },
        { path: '/parking/bharatpur', city: 'Bharatpur' },
    ];
    const airports = [
        {
            path: '/booking/tribhuvan-international-airport',
            airport: 'Tribhuvan International Airport',
        },
        {
            path: '/booking/gautam-buddha-international-airport',
            airport: 'Gautam Buddha International Airport',
        },
        {
            path: '/booking/pokhara-international-airport',
            airport: 'Pokhara International Airport',
        },

        // Major Domestic/Trekking Airports
        {
            path: '/booking/tenzing-hillary-airport',
            airport: 'Tenzing-Hillary Airport',
        },
        {
            path: '/booking/nepalgunj-airport',
            airport: 'Nepalgunj Airport',
        },
        {
            path: '/booking/bharatpur-airport',
            airport: 'Bharatpur Airport',
        },
        {
            path: '/booking/jomsom-airport',
            airport: 'Jomsom Airport',
        },
        {
            path: '/booking/ramechhap-airport',
            airport: 'Ramechhap Airport',
        },
    ];
    const stadiums = [
        {
            path: '/booking/dasharath-rangasala',
            stadium: 'Dasharath Rangasala',
        },
        {
            path: '/booking/pokhara-rangasala',
            stadium: 'Pokhara Rangasala',
        },
        {
            path: '/booking/sahid-rangasala',
            stadium: 'Sahid Rangasala',
        },
        {
            path: '/booking/tu_cricket-ground',
            stadium: 'TU International Cricket Ground',
        },
        {
            path: '/booking/narayani-stadium',
            stadium: 'Narayani Stadium',
        },
        {
            path: '/booking/chyasal-stadium',
            stadium: 'Chyasal Stadium',
        },
    ];
    return (
        <div className='w-full h-auto py-10 px-24'>

            <h1 className='text-2xl font-bold'>Top Locations</h1>

            <div className='w-full text-lg text-[#9e9e9e] flex gap-2 border-b border-b-gray-200'>
                {buttons.map((buttonValue, idx) => (
                    <button
                        className={`px-10 pt-6 pb-4 ${showLocation == buttonValue ? 'text-gray-900 font-semibold border-b-4 border-b-gray-900 transition-colors': ''} cursor-pointer`}
                        onClick={() => setShowLocation(buttonValue)}>{buttonValue}</button>
                ))}
            </div>
            <div className='pl-10 mt-6'>
                {/* Popular Attractions */}
                {showLocation == 'Popular Attractions' &&
                    <div className="grid grid-cols-4 [grid-auto-flow:column] [grid-template-rows:repeat(5,minmax(0,1fr))] gap-6">
                        {popularAttractions.map((place, i) => (
                            <Link key={place.path} path={place.path} className="">
                                {place.location}
                            </Link>
                        ))}
                    </div>
                }
                {/* Cities */}
                {showLocation == 'Cities' &&
                    <div className="grid grid-cols-4 [grid-auto-flow:column] [grid-template-rows:repeat(5,minmax(0,1fr))] gap-6">
                        {cities.map((city, i) => (
                            <Link key={city.path} path={city.path} className="">
                                {city.city}
                            </Link>
                        ))}
                    </div>
                }
                {/* Airports */}
                {showLocation == 'Airports' &&
                    <div className="grid grid-cols-4 [grid-auto-flow:column] [grid-template-rows:repeat(5,minmax(0,1fr))] gap-6">
                        {airports.map((airport, i) => (
                            <Link key={airport.path} path={airport.path} className="">
                                {airport.airport}
                            </Link>
                        ))}
                    </div>
                }
                
                {/* Stadiums */}
                {showLocation == 'Stadiums' &&
                    <div className="grid grid-cols-4 [grid-auto-flow:column] [grid-template-rows:repeat(5,minmax(0,1fr))] gap-6">
                        {stadiums.map((staduim, i) => (
                            <Link key={staduim.path} path={staduim.path} className="">
                                {staduim.stadium}
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default TopLocations