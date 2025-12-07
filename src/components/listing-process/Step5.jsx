import { useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";


function Step5({ step, setStep, hourly, setHourly, daily, setDaily, setBillingType }) {
    const [clicked, setClicked] = useState('');
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

                <div className="flex flex-col gap-4">
                    <div className={`border border-[rgb(158,158,158)] rounded-md pl-3 py-3 cursor-pointer hover:bg-gray-200 ${clicked == 'Automated' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setClicked('Automated');
                            setBillingType('Authomated')
                        }}>
                        <h1 className="font-medium text-[#212121]">Automated</h1>
                        <p className="text-sm text-[#9e9e9e]">We'll set the price on your behalf taking into account seasonal trends and local demand.</p>
                    </div>
                    <div className={`border border-[#9e9e9e] rounded-md pl-3 py-3 cursor-pointer hover:bg-gray-200 ${clicked == 'Manual' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setClicked('Manual');
                            setBillingType('Manual')
                        }}>
                        <h1 className="font-medium text-[#212121]">Manual</h1>
                        <p className="text-sm text-[#9e9e9e]">Set your own prices.</p>
                    </div>
                </div>

                {clicked == 'Manual' &&
                    <div>
                        <h2 className="mt-16 text-2xl font-medium text-[#212121]">Set the space pricing</h2>
                        <p className="mt-6 text-md">We've pre-populated the pricing using the average for your area and its a guide to what drivers will expect to pay. You can change this by simply selecting the relevant price.</p>

                        <div className="mt-8 flex justify-between">
                            <div className="flex items-center gap-4">
                                <MdOutlineWatchLater size={20} />
                                <label className="text-xl ">Hourly</label>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="font-medium text-xl">Rs</span>
                                <input type="number"
                                    className="no-spinner w-3xs max-w-xl border border-gray-300 rounded-md 
                                py-2 px-4 text-gray-700 
                                focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={hourly}
                                    onChange={(e) => setHourly(e.target.value)}
                                    placeholder={hourly} />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <div className="flex items-center gap-4">
                                <FaRegCalendarAlt size={20} />
                                <label className="text-xl ">Daily</label>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="font-medium text-xl">Rs</span>
                                <input type="number"
                                    className="no-spinner w-3xs max-w-xl border border-gray-300 rounded-md 
                                py-2 px-4 text-gray-700 
                                focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={daily}
                                    onChange={(e) => setDaily(e.target.value)}
                                    placeholder={daily} />
                            </div>
                        </div>
                    </div>}

            </div>
            {/* Bottom fixed footer */}
            <div className="w-full border-t border-t-gray-300 mt-8 py-6 flex justify-between">
                <button className="ml-5 cursor-pointer text-green-600 font-medium"
                    onClick={() => setStep(4)}>Go back</button>
                <button className="
                            mr-5 cursor-pointer
                            bg-green-500 text-white font-medium
                            px-10 py-3 rounded-md
                            hover:bg-green-600 transition
                            "
                    onClick={() => setStep(6)}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Step5