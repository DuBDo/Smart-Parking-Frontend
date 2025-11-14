import { useNavigate } from 'react-router';
import logo from '/logo.webp'
import { FcGoogle } from "react-icons/fc";

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
            <div className="pl-7 pr-8 py-12 min-w-3xl shadow rounded bg-white shadow-gray-300">
                <img src={logo} alt="" className='w-11 h-11' />
                <div className='pl-2 flex justify-between'>
                    <h1 className="text-2xl leading-14 w-xs font-[400] py-9">You need to sign in or create an account to continue.</h1>

                    <div className='flex flex-col gap-3 items-end'>
                        <div className="w-xs py-2 flex items-center justify-center gap-2 rounded border border-[#dfdfdf]
                        cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50"
                        onClick={()=>window.open('http://localhost:8000/api/V1/auth/google', '_self')}>
                            <FcGoogle size={20} />
                            Login with Google 
                        </div>

                        <div className="w-xs py-2 text-center rounded border border-[#dfdfdf]
                        cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50 "
                        onClick={()=>navigate('/login')}>
                            Login with email
                        </div>

                        <div className="w-xs py-2 text-center rounded border border-[#dfdfdf]
                        cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50"
                        onClick={()=>navigate('/signup')}>
                            Sign up with email
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage