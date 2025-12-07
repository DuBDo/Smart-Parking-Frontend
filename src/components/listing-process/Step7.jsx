import axios from 'axios';
import { MdOutlineLocationOn } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { LuCircleParking } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../../redux/userSlice';

function Step7({ name, step, setStep, postCode, parkType, count, size, ev, address, hourly, daily,
    phone, description, features, photos
}) {
    const percentage = (step / 6) * 100;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, user } = useSelector(state => state.user);
    const handleListing = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('postCode', postCode);
            formData.append('parkType', parkType);
            formData.append('count', count);
            formData.append('size', size);
            formData.append('ev', ev);
            formData.append('address', address);
            formData.append('hourly', hourly);
            formData.append('daily', daily);
            formData.append('phone', phone);
            formData.append('features', features);
            formData.append('description', description);

            for (let i = 0; i < photos.length; i++) {
                formData.append("photos", photos[i]);
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/V1/parking-lot`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
                dispatch(setUser(response.data.user));
                navigate('/dashboard');
        } catch (error) {
            console.log(error?.status);
            if (error?.status == 401) {
                navigate('/');
            }
        }
    }
    return (
        <div className="relative min-h-screen w-1/2 bg-white flex flex-col">
            {/* Top bar */}
            <div className="flex justify-between items-center px-8 py-8 text text-gray-500">
                <span className="font-medium text-black">Submit for review</span>

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
                    Take a look at your listing
                </h1>
                <p className="text-md"><span className="font-medium">Note: </span>You will need to be verified to rent out your space it won't take longer than 24hrs.</p>


                <div className="flex flex-col gap-3 text-lg mt-8">
                    {/* map */}
                    <div className="flex items-center gap-5">
                        <MdOutlineLocationOn size={25}
                            className="" />
                        <p>{address}</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <BiCoinStack size={25} />
                        {hourly ? <p>Rs {hourly} per hour</p> : <p>Rs {daily} per day</p>}
                    </div>
                    <div className="flex items-center gap-5">
                        <LuCircleParking size={25} />
                        <p>{parkType} bookings</p>
                    </div>

                </div>
                {/* Bottom fixed footer */}
            </div>
            <div className="w-full border-t border-t-gray-300 mt-8 py-6 flex justify-between">
                <button className="ml-5 cursor-pointer text-green-600 font-medium"
                    onClick={() => setStep(6)}>Go back</button>
                <button className="
                            mr-5 cursor-pointer
                            bg-green-500 text-white font-medium
                            px-10 py-3 rounded-md
                            hover:bg-green-600 transition
                            "
                    onClick={handleListing}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Step7