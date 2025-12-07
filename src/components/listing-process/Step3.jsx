

function Step3({step, setStep}) {
    const percentage = (step / 6) * 100;
  return (
    <div className="relative min-h-screen w-1/2 bg-white flex flex-col">
                {/* Top bar */}
                <div className="flex justify-between items-center px-8 py-8 text text-gray-500">
                    <span className="font-medium text-black">Space type</span>
                    <span className="text-gray-400">Save for later</span>
                </div>
    
                {/* Progress line */}
                <div className="w-full h-1 bg-gray-200">
                    <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
    
                {/* Main content */}
                <div className="flex-1 flex flex-col mt-14 px-20">
                    <h1 className="text-2xl font-semibold mb-8">
                        What type of bookings do you want?
                    </h1>

                    <div className="flex flex-col gap-4">
                        <div className="border border-[#9e9e9e] rounded-md pl-3 py-3 cursor-pointer">
                            <h1 className="font-medium text-[#212121]">All bookings (maximum earnings)</h1>
                            <p className="text-sm text-[#9e9e9e]">Accept both monthly and standard (hourly / daily) bookings.</p>
                        </div>
                        <div className="border border-[#9e9e9e] rounded-md pl-3 py-3 cursor-pointer">
                            <h1 className="font-medium text-[#212121]">Standard bookings - hourly / daily</h1>
                            <p className="text-sm text-[#9e9e9e]">Drivers will be able to book your parking space for hours, days or weeks.</p>
                        </div>
                        <div className="border border-[#9e9e9e] rounded-md pl-3 py-3 cursor-pointer">
                            <h1 className="font-medium text-[#212121]">Monthly bookings</h1>
                            <p className="text-sm text-[#9e9e9e]">Accepting monthly rolling bookings means that a single driver will use this space. You will receive a regular monthly income.</p>
                        </div>
                    </div>
                    
                    {/* Bottom fixed footer */}
                </div>
                <div className="w-full border-t border-t-gray-300 mt-8 py-6 flex justify-between">
                    <button className="ml-5 cursor-pointer text-green-600 font-medium"
                    onClick={()=>setStep(2)}>Go back</button>
                    <button className="
                            mr-5 cursor-pointer
                            bg-green-500 text-white font-medium
                            px-10 py-3 rounded-md
                            hover:bg-green-600 transition
                            "
                            onClick={()=>setStep(4)}>
                        Continue
                    </button>
                </div>
            </div>
  )
}

export default Step3