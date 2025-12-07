import image from '../../../public/rent-space/submitted.png'
import { IoIosArrowForward } from "react-icons/io";
import Description from './Description';
import { useState } from 'react';
import AddPhotos from './AddPhotos';

function Step6({ step, setStep, phone, setPhone, description, setDescription, setSpaceFeatures, photos, setPhotos }) {
  const percentage = (step / 7) * 100;

  const [open, setOpen] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const handlePhotos = (files) => {
    console.log("Selected images:", files);
    setPhotos(files);
    setUploadedPhotos(files);
  };
  return (
    <div className="flex">
      <div className='relative flex-1 w-1/2 h-screen px-16 bg-[#f7fef8]'>
        <h1 className='mt-14 text-5xl font-medium text-[#007600]'>Listing submitted! What's next?</h1>
        <img src={image} alt=""
          className='absolute z-20 top-38 left-16 w-lg h-fit bg-[#f7fef8] bg-transparent' />
        <div className='absolute z-10 left-46 top-40 w-72 h-72 bg-[#f1fbf2] rounded-full'>

        </div>

      </div>
      <div className="relative min-h-screen w-1/2 bg-white flex flex-col">
        {/* Top bar */}
        <div className="flex justify-between items-center px-8 py-8 text text-gray-500">
          <span className="font-medium text-black">Space type</span>
          <span className="text-gray-400">Save for later</span>
        </div>

        {/* Progress line */}
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col mt-14 px-20">
          <h1 className="text-2xl font-semibold mb-8">
            Getting your listing published
          </h1>
          <p className='my-5'>We need you to do a few things to get your account verified.</p>

          <input type="number"
          className=" no-spinner
          w-full max-w-xl border border-gray-300 rounded-md
          py-3 px-4 text-gray-700
          focus:outline-none focus:ring-2 focus:ring-green-500
          "
          value={phone}
          onChange={(e) => { setPhone(e.target.value) }}
                    placeholder="Enter your mobile number"/>

          <p className='my-5'>The more useful information you add to your listing, the more confident a driver will feel when booking.</p>

           <div className="flex flex-col gap-4">
                        <div className="relative border border-[#9e9e9e] rounded-md pl-3 py-3 cursor-pointer hover:bg-gray-200"
                        onClick={()=>setAddPhoto(true)}>
                            <h1 className="font-medium text-[#212121]">Add photos</h1>
                            <p className="text-sm text-[#9e9e9e]">Photos encourage trust and make your space stand out.</p>
                            <IoIosArrowForward size={20} className='absolute right-4 top-6 text-[#212121]'/>

                        {addPhoto &&
                        <AddPhotos onChange={handlePhotos} photos={photos} setPhotos={setPhotos}/>}
                        </div>
                        <div className="relative border border-[#9e9e9e] rounded-md pl-3 py-3 cursor-pointer hover:bg-gray-200"
                        onClick={() => setOpen(true)}>
                            <h1 className="font-medium text-[#212121]">Add a description and features</h1>
                            <p className="text-sm text-[#9e9e9e]">Make your space more appealing to drivers.</p>
                            <IoIosArrowForward size={20} className='absolute right-4 top-6 text-[#212121]'/>
                        </div>

                        <Description open={open} setOpen={setOpen} onClose={()=>setOpen(false)}
                        description={description} setDescription={setDescription}
                        setSpaceFeatures={setSpaceFeatures}/>
            </div>
          {/* Bottom fixed footer */}
        </div>
        <div className="w-full border-t border-t-gray-300 mt-8 py-6 flex justify-between">
          <button className="ml-5 cursor-pointer text-green-600 font-medium"
            onClick={() => setStep(5)}>Go back</button>
          <button className="
                            mr-5 cursor-pointer
                            bg-green-500 text-white font-medium
                            px-10 py-3 rounded-md
                            hover:bg-green-600 transition
                            "
            onClick={() => setStep(7)}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step6