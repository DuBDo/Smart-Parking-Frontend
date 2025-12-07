
function Step2({step, setStep, ev, setEV}) {
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
                        Do you have an electric vehicle charger?
                    </h1>

                    <div className="flex justify-between">
                    <button className="border rounded px-28 py-2.5 cursor-pointer hover:bg-gray-200"
                    onClick={()=>setEV(true)}>Yes</button>
                    <button className="border rounded px-28 py-2.5 cursor-pointer hover:bg-gray-200"
                    onClick={()=>{setEV(false)}}>No</button>
                    </div>
                    
                    {/* Bottom fixed footer */}
                </div>
                <div className="w-full border-t border-t-gray-300 mt-8 py-6 flex justify-between">
                    <button className="ml-5 cursor-pointer text-green-600 font-medium"
                    onClick={()=>setStep(1)}>Go back</button>
                    <button className="
                            mr-5 cursor-pointer
                            bg-green-500 text-white font-medium
                            px-10 py-3 rounded-md
                            hover:bg-green-600 transition
                            "
                            onClick={()=>setStep(3)}>
                        Continue
                    </button>
                </div>
            </div>
  )
}

export default Step2