import { useRef, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";

export default function AddPhotos({ onChange, photos, setPhotos }) {
  const fileInputRef = useRef(null);
  

  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    const newPhotos = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updated = [...photos, ...newPhotos];
    setPhotos(updated);
    onChange(updated.map((p) => p.file));  // send files to parent
  };

  const removePhoto = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    onChange(updated.map((p) => p.file));
  };

  return (
    <div className="w-full">

      {/* Drop Zone */}
      <div
        className="
          mr-2 mt-4 border-2 border-dashed border-gray-300 rounded-lg 
          p-10 text-center cursor-pointer hover:border-gray-400
        "
        onClick={() => fileInputRef.current.click()}
      >
        <FiCamera className="mx-auto text-3xl text-gray-600" />

        <p className="mt-3 text-gray-600">
          Drag your photos here or upload them
        </p>

        <button className="
          mt-4 px-6 py-2 border border-green-600 text-green-600 
          rounded-md hover:bg-green-50 cursor-pointer
        ">
          Add photos
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden cursor-pointer"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Preview */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo.preview}
                className="w-full h-32 object-cover rounded-md border"
              />

              <button
                className="
                  absolute top-1 right-1 bg-black/60 
                  text-white p-1 rounded-full opacity-0 
                  group-hover:opacity-100 transition cursor-pointer
                "
                onClick={() => removePhoto(index)}
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
