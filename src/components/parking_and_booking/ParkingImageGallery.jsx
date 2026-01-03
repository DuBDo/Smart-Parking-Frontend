import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCameraOutline } from "react-icons/io5";

const ParkingImageGallery = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Layout Logic
  const renderGrid = () => {
    const count = images.length;

    if (count === 1) {
      return (
        <div
          className="w-lg h-[420px] rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={images[0]}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="w-lg grid grid-cols-2 gap-3 h-[380px]">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setIsOpen(true)}
              className="w-full h-full object-cover rounded-xl cursor-pointer"
            />
          ))}
        </div>
      );
    }

    // 3 or more images: 1 large on left, 2 smaller on right
    return (
      <div className="w-lg grid grid-cols-2 grid-rows-2 gap-3 h-[380px]">
        {/* Big top image */}
        <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden">
          <img
            src={images[0]}
            onClick={() => {
              setCurrentIndex(0);
              setIsOpen(true);
            }}
            className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition"
            alt=""
          />
        </div>

        {/* Bottom left image */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={images[1]}
            onClick={() => {
              setCurrentIndex(1);
              setIsOpen(true);
            }}
            className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition"
            alt=""
          />
        </div>

        {/* Bottom right image */}
        <div
          className={`rounded-2xl overflow-hidden ${
            images.length > 3 ? "relative" : ""
          }`}
        >
          <img
            src={images[2]}
            onClick={() => {
              setCurrentIndex(2);
              setIsOpen(true);
            }}
            className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition"
            alt=""
          />
          {images.length > 3 && (
            <div className="absolute bottom-1 right-1 z-10 flex gap-2 bg-white cursor-pointer">
              <IoCameraOutline size={24} />
              <span>see all photos</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {renderGrid()}

      {/* --- Fullscreen Modal Slider --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            {/* Header */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-white">
              <span className="text-sm font-light">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition cursor-pointer"
              >
                <X size={30} />
              </button>
            </div>

            {/* Main Image Slider */}
            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center px-12">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="absolute left-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white disabled:opacity-20 cursor-pointer"
              >
                <ChevronLeft size={36} />
              </button>

              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-h-full max-w-full object-contain select-none"
              />

              <button
                disabled={currentIndex === images.length - 1}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="absolute right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white disabled:opacity-20 cursor-pointer"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParkingImageGallery;
