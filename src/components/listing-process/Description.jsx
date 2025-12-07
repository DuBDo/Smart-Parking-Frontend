import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function Description({ open, setOpen, onClose, description, setDescription, setSpaceFeatures }) {
    if (!open) return null;

    const [features, setFeatures] = useState([]);

    const handleFeatureChange = (feature) => {
        setFeatures((prev) =>
            prev.includes(feature)
                ? prev.filter((f) => f !== feature) // remove if already selected
                : [...prev, feature] // add if not selected
        );
    };

    const handleSubmit = () => {
        console.log("Received from modal:", features);
        setSpaceFeatures(features); // store in parent
        setOpen(false);
    }
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
            {/* Fullscreen overlay */}
            <div className="fixed inset-0" onClick={onClose}></div>

            {/* Modal container */}
            <div className="
        relative z-[10000]
        bg-white 
        rounded-lg 
        w-[600px] 
        max-h-[90vh] 
        flex 
        flex-col 
        shadow-[0_0_30px_rgba(0,0,0,0.2)]
      ">

                {/* Header */}
                <div className="relative px-6 py-4 border-b border-gray-200">
                    <h2 className="text-[20px] font-semibold text-gray-900">
                        Add a description and features
                    </h2>
                    <p className="my-3">Add a description, including information you think customers will find useful and indicate any features specific to the space.</p>
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-4 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                    >
                        <RxCross2 size={20} />
                    </button>
                </div>

                {/* Content (scrollable) */}
                <div className="px-6 py-4 overflow-y-auto">
                    {/* Textarea */}
                    <textarea
                        placeholder="vehicles i.e. Audi A3"
                        className="
              w-full 
              border border-gray-300 
              rounded-md 
              p-3 
              text-[15px]
              focus:outline-none 
              focus:ring-[2px] 
              focus:ring-green-500
              resize-none
            "
                        rows="3"
                        value={description}
                        onChange={setDescription}
                    />

                    <p className="font-medium text-[15px] mt-6 mb-4">
                        What features does your space have?
                    </p>

                    {/* Checkbox list */}
                    <div className="space-y-4 text-[15px]">
                        {[
                            "CCTV",
                            "Disabled access",
                            "Lighting",
                            "Covered parking",
                            "Airport transfers",
                        ].map((item, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-[18px] w-[18px] rounded border-gray-400"
                                    checked={features.includes(item)}
                                    onChange={() => handleFeatureChange(item)}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Footer (sticky) */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
                    <button
                        onClick={onClose}
                        className="
            cursor-pointer
              px-6 
              py-2 
              border border-gray-300 
              rounded-md 
              text-gray-700 
              text-[15px]
              hover:bg-gray-100
            "
                    >
                        Cancel
                    </button>

                    <button
                        className="
            cursor-pointer
              bg-green-600 
              text-white 
              px-8 
              py-2 
              rounded-md 
              text-[15px]
              hover:bg-green-700
            "
                        onClick={handleSubmit}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
