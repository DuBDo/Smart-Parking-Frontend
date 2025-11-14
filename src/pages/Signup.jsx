// import React from 'react'
// import AuthForm from '../components/AuthForm'

// function Login() {
//   return <AuthForm type={'login'}/>
// }

// export default Login
import { useState } from 'react'
import logo from '/logo.webp'
import { useDispatch } from 'react-redux';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { setUser } from '../redux/userSlice';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [signupError, setSignupError] = useState('');

  const url = `${import.meta.env.VITE_BACKEND_URL}`;

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fullName == '') {
      return setSignupError('Please enter your name');
    } else if (mobile.length != 10) {
      return setSignupError('Please enter mobile no. correctly');
    } else if (email == '') {
      return setSignupError('Email is mandatory!')
    }
    else if (password == '') {
      return setSignupError('Password is mandatory!')
    } else if (!emailRegex.test(email)) {
      return setSignupError("Please enter a valid email address.");
    }

    else if (password.length < 8) {
      return setSignupError("Password must be at least 8 characters long.");
    } else {
      setSignupError('')
    }
    try {
      const { data } = await axios.post(`${url}/api/V1/auth/signup`, {
        fullName,
        mobile,
        email,
        password,
      });

      dispatch(setUser({ user: data.user, token: data.token }));
      navigate('/dashboard')
    } catch (error) {
      setSignupError(error.response?.data?.message || 'Server error');
      console.log(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
      <div className="pl-7 pr-8 py-12 min-w-3xl shadow rounded bg-white shadow-gray-300">
        <img src={logo} alt="" className='w-11 h-11' />
        <div className='pl-2'>
          <h1 className="text-xl font-[400] py-9">Create an account to continue</h1>

          {/* input felds */}
          <form action="" >
            {/* fullname  */}
            <div className='flex justify-between items-center'>

              <label htmlFor="fullName">Full name</label>
              <input type="text" id='fullName' value={fullName} placeholder='Enter your full name'
                onChange={(e) => {
                  setSignupError('');
                  setFullName(e.target.value);
                }}
                className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
            </div>
            {/* mobile  */}
            <div className='flex justify-between items-center mt-3'>

              <label htmlFor="mobile">Mobile no.</label>
              <input type="number" id='mobile' value={mobile} placeholder='Enter valid mobile no.'
                onChange={(e) => {
                  setSignupError('');

                  setMobile(e.target.value);
                }}
                className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
            </div>
            {/* email  */}
            <div className='flex justify-between items-center mt-3'>

              <label htmlFor="email">Email</label>
              <input type="email" id='email' value={email} placeholder='example@mail.com'
                onChange={(e) => {
                  setSignupError('');

                  setEmail(e.target.value);
                }}
                className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
            </div>
            {/* password  */}
            <div className='flex justify-between items-center mt-3 '>

              <label htmlFor="password">Password</label>
              <div className='relative'>
                <input type={`${showPassword ? "text" : "password"}`} id='password' value={password} placeholder='Enter your password'
                  autoComplete='current-password'
                  onChange={(e) => {
                    setSignupError('');

                    setPassword(e.target.value);
                  }}
                  className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
                <button type='button' className='absolute right-3 top-[14px] text-gray-500 cursor-pointer' onClick={() => { setShowPassword(!showPassword) }}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
              </div>

            </div>
            <div className='flex justify-between items-center my-3'>
              <p className='text-red-500 w-fit '>{signupError}</p>
            </div>
            <div className='mt-12 mb-3 flex items-center justify-between'>
              <button className='text-[#1fa637] text-lg cursor-pointer'
                onClick={() => navigate('/')}>
                Cancel
              </button>
              <button className='px-14 py-3 text-white rounded-lg font-medium text-lg cursor-pointer bg-[#1fa637] hover:bg-green-700'
                onClick={(e) => handleSignUp(e)}>
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup