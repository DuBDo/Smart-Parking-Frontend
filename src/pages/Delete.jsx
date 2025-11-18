import axios from "axios";
import { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from '../redux/userSlice'

function Delete() {
    const {token} = useSelector(state=>state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const handleDelete = async () =>{
        console.log('jhte')
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/V1/auth/delete`,
                {headers:{
                    Authorization: `Bearer ${token}`
                }}
            )

            if(response.status == 200){
                dispatch(logout());
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#f8f9fb]">
            <div className="px-7 py-12 min-w-xl shadow rounded bg-white shadow-gray-300">
                <h1 className='font-medium text-xl'>Are you sure you want to delete your JustPark account?</h1>
                <p className='mt-4 font-medium'>By deleting your account:</p>
                <ul className='mt-2 text-sm'>
                    <li className='mt-1.5'>You'll no longer be able to access your invoices, booking history and payment sources.</li>
                    <li className='mt-1.5'>If you want to use JustPark again you'll have to create a new account.</li>
                </ul>
                <div className="mt-3 flex gap-2">
                    {!checked?
                    <MdCheckBoxOutlineBlank 
                    size={18}
                    onClick={()=>setChecked(!checked)}/>:
                    <MdCheckBox
                    className="text-green-600"
                    size={18}
                    onClick={()=>setChecked(!checked)}/>}
                    <p className='text-sm'>Yes, I want to delete my JustPark account, I cannot undo this action.</p>
                </div>
                <div className='flex justify-end'>
                <button className={`mt-7 px-14 py-2 text-white rounded-lg font-medium text-lg ${!checked?'bg-[#fb8aa6]':'bg-[#f93c6a] hover:bg-[#fd1650] cursor-pointer '}  `}
                disabled={!checked}
                onClick={handleDelete}>Delete my account</button>
                </div>
            </div>
        </div>
    )
}

export default Delete