import { useDispatch, useSelector } from "react-redux";
import DashboardSideBar from "../components/DashboardSideBar";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import Vehicle from "../components/driver_profile_components/Vehicle";
import Address from "../components/driver_profile_components/Address";

function DriverProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { user, token } = userData;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.surName || "");
  const [mobile, setMobile] = useState(user.mobile || "");
  const [email, setEmail] = useState(user.email);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [change, setChange] = useState(false);

  const fName = user.firstName;
  const lName = user.surName || "";
  const phone = user.mobile || "";
  const eAddr = user.email;

  useEffect(() => {
    if (
      firstName !== fName ||
      lastName !== lName ||
      mobile !== phone ||
      email !== eAddr
    ) {
      setChange(true);
    } else {
      setChange(false);
    }
  }, [firstName, lastName, mobile, email]);
  const handleChanges = async () => {
    let data = {};
    if (firstName.trim() != fName) data.firstName = firstName;
    if (lastName.trim() != lName) data.surName = lastName;
    if (mobile.trim() != phone) data.mobile = mobile;
    if (email.trim() != eAddr) data.email = email;

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/driver/account`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        dispatch(
          setUser({
            token,
            user: {
              ...user, // from state
              ...response.data.user, // updated fields
            },
          })
        );
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
      if (error.response?.data?.message == "Unauthorized, token expired") {
        navigate("/");
      }
    }
  };
  return (
    <div className="flex">
      <DashboardSideBar />
      <div className="bg-[#f8fbfb] py-10 flex-1 px-52">
        <div className="bg-white rounded shadow-md shadow-gray-400 py-9 px-10">
          <h1 className="font-medium text-lg">Account information</h1>
          <p className="mt-3 text-[#999999] text-[15px]">
            You can edit your Smart Park profile information below. Clicking on
            the reset password button will send OTP to your email.
          </p>

          <div className="mt-6 flex justify-between">
            {/* first name  */}
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-[#666666] font-medium">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                id="firstName"
                className="w-2xs py-2 px-3 text-[#212121] text-lg border border-[#e5e5e5] rounded focus:outline-none focus:ring-2 focus:ring-green-500 "
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {/* SurName   */}
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-[#666666] font-medium">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                id="lastName"
                className="w-2xs py-2 px-3 text-[#212121] text-lg border border-[#e5e5e5] rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* mobile no. */}
          <div className="mt-6 flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-[#666666] font-medium">
                Mobile number
              </label>

              <div className="w-2xs flex text-[#212121] text-lg border border-[#e5e5e5] rounded">
                <div className="w-24 py-2 px-3 border-r border-r-[#e5e5e5]">
                  +977
                </div>
                <input
                  type="number"
                  value={mobile}
                  id="mobile"
                  className="w-auto py-2 px-3 flex-1 no-spinner focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* email  */}
          <div className="mt-6 flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[#666666] font-medium">
                Email address
              </label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  id="email"
                  className={`w-2xs py-2 px-3 text-[#212121] text-lg border border-[#e5e5e5] bg-[#fefcf9] rounded focus:outline-none focus:ring-2 focus:ring-green-500 
                                        ${disabled ? "cursor-red" : ""}`}
                  disabled={disabled}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="w-20 ml-3 py-2.5 px-2.5 font-medium text-[#212121] text-lg border border-[#808080] rounded-md focus:outline-0 cursor-pointer"
                  onClick={() => setDisabled(false)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          {user.isVerified && (
            <div className="flex items-center gap-1.5 mt-1">
              <FaCircleCheck size={14} className="text-[#24cd6a]" />
              <p className="text-[13px] text-[#9e9e9e]">Email verified</p>
            </div>
          )}

          {/* Password  */}
          <div className="mt-6 mb-6 flex">
            <div className="flex flex-col w-full">
              <label
                htmlFor="resetPassword"
                className="text-[#666666] font-medium"
              >
                Password
              </label>

              <div className="flex justify-between w-full mt-2">
                <button
                  className="w-52 py-2.5 px-4 font-medium text-white text-lg bg-[#1fa637] rounded-lg cursor-pointer text-center hover:bg-green-700 transition"
                  onClick={() => navigate("/forgot-password")}
                >
                  Reset Password
                </button>

                {change && (
                  <button
                    className="w-64 py-2.5 px-4 font-medium text-white text-lg bg-[#1fa637] rounded-lg cursor-pointer text-center"
                    onClick={() => handleChanges()}
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
          {success && (
            <p className="text-[#24cd6a]">
              Your profile information has been updated successfully
            </p>
          )}
        </div>

        {/* Vechicle */}
        <Vehicle token={token} user={user} />

        {/* Address  */}

        <button
          className="w-full mt-6 py-2.5 px-4 font-medium  text-lg border rounded-lg cursor-pointer text-center hover:bg-[#f93c6a] transition-colors ease-out"
          onClick={() => navigate("/auth/delete")}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}

export default DriverProfile;
