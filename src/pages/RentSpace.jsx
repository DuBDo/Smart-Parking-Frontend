import { useState } from 'react';
import rentspace from '/public/rent-space/rent-space.webp';
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
const RentSpace = () => {
    const [name, setName] = useState('');
    const [postCode, setPostCode] = useState('');
    const [email, setEmail] = useState('');

    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const handleRentSpace = () => {
        if (email == user.email) {
            navigate(`/dashboard/listing-onboarding/${name}/${postCode}`)
        }
    }
    return (
        <div className='mx-14'>
            <div className='flex gap-8 mt-14 h-[494px]'>
                <div className='max-w-xl flex flex-col justify-center gap-5'>
                    <p className='text-4xl tracking-wide font-extrabold'>Turn Your Parking Space Into <span className='text-[#1fa637]'>Extra Income  </span></p>
                    <div className='w-full p-5 rounded-xl shadow-lg'>
                        <h3 className='font-semibold'>See how much spaces in your area can earn!</h3>
                        <div className='flex gap-3 justify-between my-3'>
                            <input type="text" placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className='w-1/2 px-2 py-2 text-semibold rounded border border-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-green-500' />
                            <input type='text' placeholder='Postcode'
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                                className='w-1/2 px-2 py-2 text-semibold rounded border border-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-green-500' />
                        </div>

                        <input type="email" placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-2 py-2 text-semibold rounded border border-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-green-500' />

                        <button className='px-14 mt-3 py-2.5 text-white rounded-lg font-medium text-lg cursor-pointer bg-[#1fa637] hover:bg-green-700'
                            onClick={handleRentSpace}>
                            Rent your space
                        </button>
                    </div>
                </div>
                <div>
                    <img src={rentspace} alt=""
                        className='w-full max-h-[450px] object-cover' />
                </div>
            </div>

        </div>
    );
};

export default RentSpace;
