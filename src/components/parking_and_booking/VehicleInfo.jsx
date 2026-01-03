import React from "react";

const VehicleInfo = ({ model, color, numberPlate, error }) => {
  return (
    <>
      <div
        className={`w-full p-8 flex flex-col gap-6 bg-white border rounded-lg ${
          error
            ? "border-b-4 border-b-[#f93c6a] border-[#dddddd]"
            : "border-[#dddddd]"
        }`}
      >
        <h2 className="text-[#212121] text-2xl font-medium">
          Vehicle information
        </h2>
        <div className="flex flex-col">
          <p className="text-[#9e9e9e]">
            Your vehicle registration number will be shared with the parking
            space owner
          </p>
          <div className="mt-3 flex flex-col gap-2 ">
            <div className="flex">
              <div className="w-1/3 font-semibold text-[#666]">
                Vehicle model:{" "}
              </div>
              {model != "" && <div className=" text-[#212121]">{model}</div>}
            </div>

            <div className="flex">
              <div className="w-1/3 font-semibold text-[#666]">
                Vehicle color:{" "}
              </div>
              {color != "" && <div className=" text-[#212121]">{color}</div>}
            </div>

            <div className="flex">
              <div className="w-1/3 font-semibold text-[#666]">
                License plate info:
              </div>
              {numberPlate != "" && (
                <div className="text-[#212121]">{numberPlate}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {error && <div className="-mt-4 px-2 text-[#f93c6a]">{error}</div>}
    </>
  );
};

export default VehicleInfo;
