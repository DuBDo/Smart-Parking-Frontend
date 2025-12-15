import React from "react";

const VehicleInfo = ({ brand, numberPlate }) => {
  return (
    <div className="w-full p-8 flex flex-col gap-6 bg-white border border-[#dddddd] rounded-lg">
      <h2 className="text-[#212121] text-2xl font-medium">
        Vehicle information
      </h2>
      <div className="flex flex-col">
        <p className="text-[#9e9e9e]">
          Your vehicle registration number will be shared with the parking space
          owner
        </p>
        <div className="flex gap-4 text-xl">
          <div className="font-semibold text-[#212121]">{brand}</div>
          <div className="text-[#212121]">{numberPlate}</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
