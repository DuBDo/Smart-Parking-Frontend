import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

function Step1({step, setStep,  postCode, setPostCode, parkingType, parkType, setParkType, count, setCount, setSize }) {
    const percentage = (step / 6) * 100;

    const [open, setOpen] = useState(false);

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
                    What is your postcode?
                </h1>

                <input
                    type="text"
                    placeholder="Enter your postcode"
                    className="
                                w-full max-w-xl border border-gray-300 rounded-md 
                                py-3 px-4 text-gray-700 
                                focus:outline-none focus:ring-2 focus:ring-green-500
                            "
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                />

                <h1 className="mt-5 text-2xl font-semibold mb-8">
                    What type of space do you have?
                </h1>
                {!open &&
                    parkingType.map((type) => {
                        return <div key={type}
                            className='mt-3 w-full max-w-xl border border-gray-300 rounded-md 
                                py-3 px-4 text-gray-700 cursor-pointer hover:bg-gray-200
                                '
                            onClick={() => {
                                setParkType(type);
                                setOpen(true);
                            }}>{type}</div>
                    })
                }

                {open &&
                    <div>
                        <div
                            className='mt-3 w-full max-w-xl border border-gray-300 rounded-md 
                                py-3 px-4 text-gray-700 cursor-pointer bg-gray-200
                                '
                        >{parkType}</div>
                        <h2 className='mt-5 text-2xl font-semibold mb-8'>How many spaces are available to rent out?</h2>
                        <div className='flex items-center gap-4'>
                            <CiCircleMinus size={35}
                                disabled={count == 0}
                                onClick={() => setCount(count != 0 ? count - 1 : count)}
                                className='cursor-pointer'
                            />
                            <p className='text-md border rounded-md py-2 px-6'>{count}</p>
                            <CiCirclePlus size={35}
                                onClick={() => setCount(count + 1)}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>
                }
                <h2 className='mt-8 text-2xl font-semibold mb-8'>What size vehicle can your space accommodate?</h2>

                <div className='mt-3 w-full max-w-xl border border-gray-300 rounded-md 
                                py-3 px-4 text-gray-700 cursor-pointer hover:bg-gray-200
                                '
                    onClick={() => setSize('Small')}>Small</div>
                <div className='mt-3 w-full max-w-xl border border-gray-300 rounded-md 
                                py-3 px-4 text-gray-700 cursor-pointer hover:bg-gray-200
                                '
                    onClick={() => setSize('Medium')}>Medium</div>
                <div className='mt-3 w-full max-w-xl border border-gray-300 rounded-md 
                                py-3 px-4 text-gray-700 cursor-pointer hover:bg-gray-200
                                '
                    onClick={() => setSize('Large')}>Large</div>
                {/* Bottom fixed footer */}
            </div>
            <div className="w-full border-t border-t-gray-300 mt-8 py-6 flex justify-end">
                <button className="
                mr-5
                        cursor-pointer
                        bg-green-500 text-white font-medium
                        px-10 py-3 rounded-md
                        hover:bg-green-600 transition
                        "
                        onClick={()=>setStep(2)}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Step1