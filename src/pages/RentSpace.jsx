import rentspace from '../assets/rentspace.webp'

const RentSpace = () => {
    return (
        <div className='bg-gray-400 mx-10'>
            <div className='flex gap-3 mt-14 h-[494px]'>
                <div className='max-w-lg flex flex-col justify-center gap-5'>
                    <p className='text-4xl tracking-wide font-bold'>Turn Your Parking Space Into <span className='text-[#1fa637]'>Extra Space</span></p>
                    <div className='w-full p-5 border rounded-xl'>
                        hello
                    </div>
                </div>
                <div>
                Right Content
                    {/* <img src={rentspace} alt="" /> */}
                </div>
            </div>

        </div>
    );
};

export default RentSpace;
