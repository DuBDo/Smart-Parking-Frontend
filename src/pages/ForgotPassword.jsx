import { useState } from 'react'
import logo from '/logo.webp'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ForgotPassword() {
    const {user} = useSelector(state=>state.user);
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const url = `${import.meta.env.VITE_BACKEND_URL}`;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSendOtp = async (e) => {
        e.preventDefault();
       if (email == '') {
            return setEmailError('Email is mandatory!')
        } else if (!emailRegex.test(email)) {
            return setEmailError("Please enter a valid email address.");

        } else {
            setEmailError('')
        }
        try {
            const { data } = await axios.post(`${url}/api/V1/auth/send-otp`, {
                email,
            })
            setEmail();
            setStep(1);
            
        } catch (error) {
            setEmailError(error.response?.data?.message || 'Server error');
            console.log(error.response?.data?.message || "Something went wrong");
        }
    }
    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if(otp ==''){
            return setOtpError('Please enter the OTP provided to your email')
        }
        try {
            const {data} = await axios.post(`${url}/api/V1/auth/verify-otp`,
                {
                    email,
                    otp
                }
            )
            setOtp('');
            setStep(2);
        } catch (error) {
            setOtpError(error.response?.data?.message || 'Server error');
            console.log(error.response?.data?.message || "Something went wrong");
        }
    }

    const handleResetPassword = async(e) => {
        e.preventDefault();
        if (newPassword != confirmPassword) {
            return setPasswordError('Both field must contain same value'); 
        }
        if(newPassword.length<8){
            return setPasswordError('Atleast 8 characters are required');
        }
        try {
            const {data} = await axios.post(`${url}/api/V1/auth/reset-password`,
                {
                    email,
                    newPassword
                }
            )
            setNewPassword('');
            setConfirmPassword('');
            setStep(3);
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Server error');
            console.log(error.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <>
            {/* // setp 0 */}
            {step == 0 &&

                <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
                    <div className="pl-7 pr-8 py-12 min-w-3xl shadow rounded bg-white shadow-gray-300">
                        <img src={logo} alt="" className='w-11 h-11' />
                        <div className='pl-2'>
                            <h1 className="text-xl font-[400] py-9">Enter your email to reset your password</h1>

                            {/* input felds */}
                            <form action="" >
                                <div className='flex justify-between items-center'>

                                    <label htmlFor="email">Email address</label>
                                    <input type="email" id='email' value={email} placeholder='example@mail.com'
                                        onChange={(e) => {
                                            
                                            setEmail(e.target.value);
                                        }}
                                        className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
                                </div>


                                <div className='flex justify-between items-center my-8'>
                                    <p className='text-red-500 w-fit '>{emailError}</p>
                                    <p className='text-[#1fa637] cursor-pointer' onClick={() => setStep(4)}>I'm confused</p>
                                </div>
                                <div className='mt-12 mb-3 flex items-center justify-between'>
                                    <button className='text-[#1fa637] text-lg cursor-pointer'
                                        onClick={() => {
                                            if(user==null) navigate('/login')
                                            else navigate('/dashboard/profile')
                                        }}>
                                        Cancel
                                    </button>
                                    <button className='px-14 py-3 text-white rounded-lg font-medium text-lg cursor-pointer bg-[#1fa637] hover:bg-green-700'
                                        onClick={(e) => { handleSendOtp(e) }}
                                    >
                                        Send Otp
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

            {/* // setp 1 */}
            {step == 1 &&

                <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
                    <div className="pl-7 pr-8 py-12 min-w-3xl shadow rounded bg-white shadow-gray-300">
                        <img src={logo} alt="" className='w-11 h-11' />
                        <div className='pl-2'>
                            <h1 className="text-xl font-[400] py-9">Enter OTP to proceed the process</h1>
                            <h1 className='text-justify mb-7 '> We've sent you the OTP via email. If you don't receive the OTP, please check you've typed your email correctly.</h1>

                            {/* input felds */}
                            <form action="" >
                                <div className='flex justify-between items-center'>

                                    <label htmlFor="otp">OTP</label>
                                    <input type="text" id='otp' value={otp} placeholder='Enter Otp'
                                        onChange={(e) => {
                                            
                                            setOtp(e.target.value);
                                        }}
                                        className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
                                </div>
                                <div className='flex justify-between items-center my-8'>
                                    <p className='text-red-500 w-fit '>{otpError}</p>
                                </div>

                                <div className='mt-12 mb-3 flex items-center justify-between'>
                                    <button className='text-[#1fa637] text-lg cursor-pointer'
                                        onClick={() => setStep(0)}>
                                        Back
                                    </button>
                                    <button className='px-14 py-3 text-white rounded-lg font-medium text-lg cursor-pointer bg-[#1fa637] hover:bg-green-700'
                                        onClick={(e) => { handleVerifyOtp(e); }}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {/* // setp 2 */}
            {step == 2 &&

                <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
                    <div className="pl-7 pr-8 py-12 min-w-3xl shadow rounded bg-white shadow-gray-300">
                        <img src={logo} alt="" className='w-11 h-11' />
                        <div className='pl-2'>
                            <h1 className="text-xl font-[400] py-9">You can now enter new password</h1>

                            {/* input felds */}
                            <form action="" >
                                <div className='flex justify-between items-center'>

                                    <label htmlFor="newPassword">Enter new password</label>
                                    <input type="email" id='newPassword' value={newPassword} placeholder='New password'
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                        }}
                                        className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
                                </div>

                                <div className='flex justify-between items-center mt-3'>

                                    <label htmlFor="confirmPassword">Re-Enter the password</label>
                                    <input type="email" id='confirmPassword' value={confirmPassword} placeholder='Enter password again'
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                        className='w-md focus:outline-0 border border-gray-400 rounded h-10 pl-4 py-6' />
                                </div>

                                <div className='flex justify-between items-center my-8'>
                                    <p className='text-red-500 w-fit '>{passwordError}</p>
                                </div>
                                <div className='mt-12 mb-3 flex items-center justify-between'>
                                    <button className='text-[#1fa637] text-lg cursor-pointer'
                                        onClick={() => setStep(1)}>
                                        Back
                                    </button>
                                    <button className='px-14 py-3 text-white rounded-lg font-medium text-lg cursor-pointer bg-[#1fa637] hover:bg-green-700'
                                        onClick={(e) => handleResetPassword(e)}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
              
                </div>
            }
            {/* // step 3 */}
            {step == 3 &&

                <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
                    <div className="pl-7 pr-8 py-12 max-w-3xl shadow rounded bg-white shadow-gray-300">
                        <img src={logo} alt="" className='w-11 h-11' />
                        <div className='pl-2'>
                            <h1 className="text-xl font-[400] py-9">The password has been changed successfully</h1>

                       
                            <h1 className='text-justify'>You can now login to your account by clicking the button below.</h1>


                            <div className='mt-12 mb-3 flex items-center justify-between'>
                                <button className='text-[#1fa637] text-lg cursor-pointer'
                                    onClick={() => navigate('/login')}>
                                    Login
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            }
            {/* // step 3 */}
            {step == 4 &&

                <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
                    <div className="pl-7 pr-8 py-12 max-w-3xl shadow rounded bg-white shadow-gray-300">
                        <img src={logo} alt="" className='w-11 h-11' />
                        <div className='pl-2'>
                            <h1 className="text-xl font-[400] py-9">Help resetting your password</h1>

                            {/* input felds */}
                            <h1 className='text-justify'>We recommend entering your email address on this screen. You should only enter the email if you aleardy have an account in SmartPar or else you can try signing up to our website for the new parking experience.</h1>


                            <div className='mt-12 mb-3 flex items-center justify-between'>
                                <button className='text-[#1fa637] text-lg cursor-pointer'
                                    onClick={() => setStep(0)}>
                                    Back
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ForgotPassword