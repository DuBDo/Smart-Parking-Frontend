import axios from "axios";
import { useState } from "react"
import { FiUpload } from "react-icons/fi";

function Vehicle({ token }) {
    const [plate, setPlate] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [plateError, setPlateError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleAddVehicle = async (e) => {
        e.preventDefault();

        if (plate == '') {
            setPlateError("You're missing the vehicle's number plate");
            return null;
        }
        setPlateError(false);
        const formData = new FormData();

        formData.append('plate', plate);
        formData.append('image', image);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/V1/driver/vehicle`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response);
            if (response.status == 200) {
                setSuccess(true);
                dispatch(setUser({
                    token,
                    user: {
                        ...user,     // from state
                        ...response.data.user  // updated fields
                    }
                }));
                navigate('/dashboard/profile');
            }
        } catch (error) {
            setFailed(true);
            if (error.response?.data?.message == "Unauthorized, token expired") {
                navigate('/');
            }
        }
    }

    return (
        <div className="bg-white rounded shadow-md shadow-gray-400 mt-8 py-9 px-10">
            <h1 className="font-medium text-lg">Vehicle</h1>
            <p className="mt-3 text-[#999999] text-[15px]">You do not currently have any vehicles registered with Smart Park. Input your number plate below to add your vehicle.</p>

            <form onSubmit={handleAddVehicle}>
                <div className="mt-6 flex flex-col">
                    <label htmlFor="plate" className="text-[#666666] font-medium">Add a vehicle</label>
                    <input type="text" value={plate}
                        id="plate"
                        className="w-xs py-2 px-3 text-[#212121] text-lg border border-[#e5e5e5] rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setPlate(e.target.value)}
                    />
                </div>
                {/* Image Upload */}
                <div>
                    <label className="text-gray-700 font-medium">Vehicle Image</label>

                    {/* Custom Upload Box */}
                    <label
                        className=" flex flex-col items-center justify-center w-full min-h-40  border-2 
                        border-dashed border-gray-300 hover:border-green-500 cursor-pointer 
                        rounded-xl bg-gray-50 transition"
                    >
                        {!preview ? (
                            <div className="flex flex-col items-center">
                                <FiUpload className="text-3xl text-gray-400" />
                                <p className="text-gray-500 mt-2">Click to upload</p>
                                <p className="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
                            </div>
                        ) : (
                            <img
                                src={preview}
                                className="w-full h-full object-cover rounded-xl"
                                alt="preview"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>
                {success && <p className="text-[#24cd6a]">Your vehicle information has been added successfully</p>}
                {failed && <p className="text-[rgb(195,11,11)]">Server error</p>}
                <p className="text-[#c30b0b]">{plateError}</p>
                <button type="submit" className="w-52 mt-8 py-2.5 px-4 font-medium text-white text-lg bg-[#1fa637] rounded-lg cursor-pointer text-center
                hover:bg-green-700 transition">
                    Add
                </button>
            </form>
        </div>
    )
}

export default Vehicle