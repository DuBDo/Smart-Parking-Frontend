import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Vehicle({ token, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* -------------------- DERIVED DATA -------------------- */
  const existingVehicle = useMemo(() => user?.vehicle?.[0] ?? null, [user]);

  /* -------------------- FORM STATE -------------------- */
  const [form, setForm] = useState({
    plate: "",
    model: "",
    color: "",
  });

  const originalForm = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const initializedRef = useRef(false);

  /* -------------------- INIT VEHICLE -------------------- */
  useEffect(() => {
    if (!existingVehicle) {
      setIsEditing(true);
      return;
    }
    if (initializedRef.current) return;

    const initialData = {
      plate: existingVehicle.plate || "",
      model: existingVehicle.model || "",
      color: existingVehicle.color || "",
    };

    setForm(initialData);
    originalForm.current = initialData;
    setPreview(existingVehicle.image || null);
    // setIsEditing(false);
    // initializedRef.current = true;
  }, [existingVehicle]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* -------------------- IMAGE -------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* -------------------- INPUT -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "plate" ? value.toUpperCase() : value,
    }));
  };

  /* -------------------- CANCEL -------------------- */
  const handleCancel = () => {
    if (!originalForm.current) return;

    setForm(originalForm.current);
    setImage(null);
    setPreview(existingVehicle.image || null);
    setIsEditing(false);
    setError("");
  };

  /* -------------------- ADD VEHICLE -------------------- */
  const handleAddVehicle = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => v && formData.append(k, v));
    if (image) formData.append("image", image);

    return axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/V1/driver/vehicle`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  /* -------------------- UPDATE VEHICLE -------------------- */
  const handleUpdateVehicle = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => v && formData.append(k, v));
    if (image) formData.append("image", image);

    return axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/V1/driver/vehicle`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.plate.trim()) {
      setError("Vehicle number plate is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = existingVehicle
        ? await handleUpdateVehicle()
        : await handleAddVehicle();

      dispatch(setUser({ token, user: res.data.user }));

      initializedRef.current = false;
      setIsEditing(false);
      setSuccess(existingVehicle ? "Vehicle updated" : "Vehicle added");
      setTimeout(() => {
        setSuccess("");
      }, 700);
    } catch (err) {
      if (err.response?.status === 401) navigate("/");
      else setError("Failed to save vehicle");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="bg-white rounded shadow-md shadow-gray-400 mt-8 py-9 px-10">
      <h1 className="font-medium text-lg">Vehicle</h1>

      <p className="mt-3 text-[#999999] text-[15px]">
        Manage your registered vehicle details
      </p>

      <form onSubmit={handleSubmit} className="mt-1 flex flex-col">
        {["plate", "model", "color"].map((field) => (
          <div key={field}>
            <label className="mt-5 block text-[#666666] font-medium">
              {field === "plate" ? "Number Plate" : field}
            </label>
            <input
              name={field}
              value={form[field] ?? ""}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-xs py-2 px-3 mt-1 text-[#212121] text-lg border border-[#e5e5e5] 
                            rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>
        ))}

        <div className="mt-5">
          <label className="block text-gray-700 font-medium">
            Vehicle Image
          </label>
          {isEditing ? (
            <label className="block border-2 border-dashed rounded-xl p-4 cursor-pointer text-center">
              {preview ? (
                <img
                  src={preview}
                  className="h-48 w-full object-cover rounded"
                  alt="vehicle"
                />
              ) : (
                <>
                  <FiUpload className="mx-auto text-2xl text-gray-400" />
                  <p className="text-gray-500">Upload image</p>
                </>
              )}
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          ) : (
            preview && (
              <img
                src={preview}
                className="h-48 w-full object-cover rounded border"
                alt="vehicle"
              />
            )
          )}
        </div>
        <div className="mt-2 h-3">
          {error && <p className=" text-red-600 text-sm">{error}</p>}
          {success && <p className=" text-green-600 text-sm">{success}</p>}
        </div>

        <div className="flex gap-4 pt-4">
          {isEditing ? (
            <>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-52 mt-8 py-2.5 px-4 font-medium text-white text-lg bg-[#1fa637] 
                            rounded-lg cursor-pointer hover:bg-green-700 transition"
              >
                Save
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="w-42 mt-8 py-2.5 px-4 text-lg bg-white border
                            rounded-lg cursor-pointer hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (originalForm.current) setForm(originalForm.current);
                setIsEditing(true);
              }}
              className="w-42 mt-8 py-2.5 px-4 text-lg bg-white border
                            rounded-lg cursor-pointer hover:bg-gray-300 transition"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Vehicle;
