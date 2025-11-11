import second1 from '../assets/second1.webp';
import second2 from '../assets/second2.webp';
import second3 from '../assets/second3.webp';

function SecondSection() {
    return (
        <div className='mt-25'>
            <div className='w-full shadow-xl/25 shadow-gray-500 bg-white p-6 rounded-lg'></div>
            <div className='w-full h-screen flex flex-col justify-center'>
                <p className='text-4xl text-[#1fa637] text-center'>Parking made easy</p>
                <div className='flex justify-evenly items-center mt-7'>
                    <div className='w-xs flex flex-col items-center justify-center'>
                        <div className='w-45 h-45 flex items-center justify-center rounded-full shadow-lg shadow-gray-400'>
                            <img src={second1} alt="" className='w-30 h-30' />
                        </div>
                        <p className='text-3xl text-[#1fa637] font-medium mt-3'>Wherever, whenever</p>
                        <p className='w-2xs mt-4 text-center text-md'>Choose from hundreds of spaces across Kathmandu</p>
                        <p className='w-2xs mt-4 text-center text-md'>Find your best option for every car journey</p>
                    </div>

                    <div className='w-xs flex flex-col items-center justify-center'>
                        <div className='w-45 h-45 flex items-center justify-center rounded-full shadow-lg shadow-gray-400'>
                            <img src={second2} alt="" className='w-30 h-30' />
                        </div>
                        <p className='text-3xl text-[#1fa637] font-medium mt-3'>Peace of mind</p>
                        <p className='w-2xs mt-4 text-center text-md'>View information on availability, price and restrictions</p>
                        <p className='w-2xs mt-4 text-center text-md'>Secure your spot in advance at verified parking spaces</p>
                    </div>

                    <div className='w-xs flex flex-col items-center justify-center'>
                        <div className='w-45 h-45 flex items-center justify-center rounded-full shadow-lg shadow-gray-400'>
                            <img src={second3} alt="" className='w-30 h-30' />
                        </div>
                        <p className='text-3xl text-[#1fa637] font-medium mt-3'>Seamless experience</p>
                        <p className='w-2xs mt-4 text-center text-md'>Make payments easily through the well known mobile wallets</p>
                        <p className='w-2xs mt-4 text-center text-md'>Follow easy directions and access instructions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondSection