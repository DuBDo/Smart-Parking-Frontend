import { useNavigate } from 'react-router';
import image from '../assets/parking-lot.jpg';

function MiddleSection() {
    const navigate = useNavigate();
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`, // replace with your background image
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-xl h-full mx-20 py-20 px-6 md:px-12 flex flex-col justify-center md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-semibold text-green-600 mb-4">
          Rent out your parking space
        </h2>
        <p className="text-gray-900 my-6">
          Make easy money by renting out your parking
          space. It's free to list and only takes a few minutes to get up and
          running.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium mt-5 px-6 py-3 rounded-md w-fit transition-colors cursor-pointer"
        onClick={()=>navigate('/how-to-list')}>
          Learn how to earn today
        </button>
      </div>
    </section>
  )
}

export default MiddleSection