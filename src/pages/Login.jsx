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

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState('');

  const url = `${import.meta.env.VITE_BACKEND_URL}/api/V1/auth/login`;

  const handleSignIn = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == '') {
      return setLoginError('Email is mandatory!')
    }
    else if (password == '') {
      return setLoginError('Password is mandatory!')
    } else if (!emailRegex.test(email)) {
      return setLoginError("Please enter a valid email address.");
    }

    else if (password.length < 8) {
      return setLoginError("Password must be at least 8 characters long.");
    } else {
      setLoginError('')
    }
    try {
      const { data } = await axios.post(url, {
        email,
        password,
      })
      
        dispatch(setUser({ user: data.user, token: data.token }));
        navigate('/home')
    } catch (error) {
      setLoginError(error.response?.data?.message|| 'Server error');
      console.log(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
      <div className="pl-7 pr-8 py-12 min-w-3xl shadow rounded bg-white shadow-gray-300">
        <img src={logo} alt="" className='w-11 h-11' />
        <div className='pl-2'>
          <h1 className="text-xl font-[400] py-9">Welcome back! Let's get you signed in.</h1>

          {/* input felds */}
          <form action="" >
            <div className='flex justify-between items-center'>

              <label htmlFor="email">Email address</label>
              <input type="email" id='email' value={email} placeholder='example@mail.com'
                onChange={(e) => {
                  setLoginError('');
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
                    setLoginError('');
                    setPassword(e.target.value);
                  }}
                  className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
                <button type='button' className='absolute right-3 top-[14px] text-gray-500 cursor-pointer' onClick={() => { setShowPassword(!showPassword) }}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
              </div>

            </div>
            <div className='flex justify-between items-center my-8'>
              <p className='text-red-500 w-fit '>{loginError}</p>
              <p className='text-[#1fa637] cursor-pointer' onClick={()=>navigate('/forgot-password')}>I've forgotten my password</p>
            </div>
            <div className='mt-12 mb-3 flex items-center justify-between'>
              <button className='text-[#1fa637] text-lg cursor-pointer'
                onClick={() => navigate('/')}>
                Cancel
              </button>
              <button className='px-14 py-3 text-white rounded-lg font-medium text-lg cursor-pointer bg-[#1fa637] hover:bg-green-700'
                onClick={(e) => handleSignIn(e)}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login