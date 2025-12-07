import axios from "axios";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Vehicle({ token, user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [plate, setPlate] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [plateError, setPlateError] = useState("");

    const [hasPlate, setHasPlate] = useState("");
    const [hasImage, setHasImage] = useState(null);

    // Load existing vehicle data
    useEffect(() => {
        const v = user?.vehicle?.[0];
        if (!v) return;

        if (v.plate) {
            setPlate(v.plate);
            setHasPlate(v.plate);
        }
        if (v.image) {
            setHasImage(v.image);
        }
    }, []);

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // Submit form
    const handleAddVehicle = async (e) => {
        e.preventDefault();

        if (!plate.trim()) {
            setPlateError("You're missing the vehicle's number plate");
            return;
        }

        setPlateError("");

        const formData = new FormData();
        if (!hasPlate) formData.append("plate", plate);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/V1/driver/vehicle`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);

            if (response.status === 200) {
                setSuccess(true);

                dispatch(
                    setUser({
                        token,
                        user: response.data.user,
                    })
                );

                setTimeout(() => {
                    navigate("/dashboard/profile");
                }, 800);
            }
        } catch (error) {
            setFailed(true);
            if (error.response?.data?.message === "Unauthorized, token expired") {
                navigate("/");
            }
        }
    };

    // Reusable Upload Box Component
    const UploadBox = () => (
        <label
            className="flex flex-col items-center justify-center w-full min-h-40
            border-2 border-dashed border-gray-300 hover:border-green-500 cursor-pointer
            rounded-xl bg-gray-50 transition p-4"
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
                    className="w-full h-48 object-cover rounded-xl"
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
    );

    return (
        <>
            {/* Add New Vehicle OR Edit Existing */}
            <div className="bg-white rounded shadow-md shadow-gray-400 mt-8 py-9 px-10">
                <h1 className="font-medium text-lg">Vehicle</h1>

                <p className="mt-3 text-[#999999] text-[15px]">
                    {hasPlate
                        ? "This is your registered vehicle information."
                        : "You do not currently have any vehicles registered. Add your number plate below."}
                </p>

                <form onSubmit={handleAddVehicle}>
                    {/* Plate Input */}
                    <div className="mt-6 flex flex-col">
                        <label className="text-[#666666] font-medium">
                            Vehicle Number Plate
                        </label>

                        <input
                            type="text"
                            value={plate}
                            disabled={Boolean(hasPlate)}
                            className="w-xs py-2 px-3 mt-1 text-[#212121] text-lg border border-[#e5e5e5] 
                            rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                            onChange={(e) => setPlate(e.target.value)}
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mt-5">
                        <label className="text-gray-700 font-medium">
                            Vehicle Image
                        </label>

                        {!hasImage ? (
                            <UploadBox />
                        ) : (
                            <img
                                src={hasImage}
                                className="w-full h-full object-cover rounded-xl mt-2"
                                alt="vehicle"
                            />
                        )}
                    </div>

                    {/* Messages */}
                    {success && (
                        <p className="text-green-600 mt-3">
                            Vehicle information added successfully
                        </p>
                    )}
                    {failed && (
                        <p className="text-red-600 mt-3">Server error</p>
                    )}
                    {plateError && (
                        <p className="text-red-500 mt-2">{plateError}</p>
                    )}

                    {/* Submit Button */}
                    {!hasPlate && (
                        <button
                            type="submit"
                            className="w-52 mt-8 py-2.5 px-4 font-medium text-white text-lg bg-[#1fa637] 
                            rounded-lg cursor-pointer hover:bg-green-700 transition"
                        >
                            Add Vehicle
                        </button>
                    )}
                </form>
            </div>
        </>
    );
}

export default Vehicle;
