import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/V1/auth/${type}`;

    try {
      const { data } = await axios.post(url, formData);

      if (type === "login") {
        dispatch(setUser({ user: data.user, token: data.token }));
        alert("Login successful!");
        navigate('/dashboard');
      } else {
        alert("Signup successful! Please login.");
        navigate('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center capitalize">
          {type === "login" ? "Login" : "Create Account"}
        </h2>

        {type === "signup" && (
          <>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border w-full p-2 mb-3 rounded"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="border w-full p-2 mb-3 rounded"
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border w-full p-2 mb-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
