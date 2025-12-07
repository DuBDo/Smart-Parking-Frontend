
function Step4({step, setStep, address, setAddress}) {
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
                        What is your space address?
                    </h1>

                    <input type="text" 
                    className="
                                w-full max-w-xl border border-gray-300 rounded-md 
                                py-3 px-4 text-gray-700 
                                focus:outline-none focus:ring-2 focus:ring-green-500
                            "
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                    placeholder="Enter space address"/>

                    {/* Map  */}
                    <div>
                        <h1 className="text-2xl mt-4 font-semibold mb-8">
                        Place the pin on the map 
                    </h1>
                    </div>
                </div>
                    {/* Bottom fixed footer */}
                <div className="w-full border-t border-t-gray-300 mt-8 py-6 flex justify-between">
                    <button className="ml-5 cursor-pointer text-green-600 font-medium"
                    onClick={()=>setStep(3)}>Go back</button>
                    <button className="
                            mr-5 cursor-pointer
                            bg-green-500 text-white font-medium
                            px-10 py-3 rounded-md
                            hover:bg-green-600 transition
                            "
                            onClick={()=>setStep(5)}>
                        Continue
                    </button>
                </div>
            </div>
  )
}

export default Step4