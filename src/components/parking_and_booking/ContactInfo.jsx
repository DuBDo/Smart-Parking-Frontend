import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ContactInfo = ({ mobile, setMobile }) => {
  const [changeMobile, setChangeMobile] = useState(mobile ? false : true);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleSave = () => {
    const phonePattern = /^(98|97)\d{8}$/;
    if (phonePattern.test(mobile)) {
      setChangeMobile(false);
      setError("");
    } else {
      setError("Invalid number");
      setChangeMobile(true);
      setTimeout(() => {
        inputRef.current?.focus(); // focus after enable
      }, 0);
    }
  };
  return (
    <div className="w-full p-8 flex flex-col gap-6 bg-white border border-[#dddddd] rounded-lg">
      <h2 className="text-[#212121] text-2xl font-medium">Let's get started</h2>
      <div className="flex flex-col gap-2">
        <h3 className="text-[#666] font-semibold">
          Phone number{" "}
          <span className="text-sm text-[#999999]">
            (in case you need to be contacted)
          </span>
        </h3>
        {/* Mobile div */}
        <div
          className={`w-xs relative text-[#212121] text-lg rounded border transition-all duration-200 ease-in-out
    ${
      error != ""
        ? "border-b-[3px] border-b-[#f93c6a] border-[#e5e5e5]"
        : "border-[#e5e5e5]"
    }
  `}
        >
          <div className="flex">
            <div className="w-24 py-2 px-3 border-r border-r-[#e5e5e5]">
              +977
            </div>
            <input
              ref={inputRef}
              type="number"
              value={mobile}
              id="mobile"
              className="w-auto py-2 px-3 flex-1 no-spinner focus:outline-none"
              onChange={(e) => setMobile(e.target.value)}
              disabled={!changeMobile}
            />
            {error && (
              <RxCross2
                size={25}
                className="absolute right-3 top-2.5 text-[#f93c6a] cursor-pointer"
                onClick={() => {
                  setMobile("");
                  inputRef.current?.focus();
                }}
              />
            )}
          </div>
        </div>
        <div className="flex gap-22">
          {mobile != null && (
            <button
              className="text-[#666] w-fit hover:underline font-semibold cursor-pointer"
              onClick={() => {
                setMobile("");
                setChangeMobile(true);
                setTimeout(() => {
                  inputRef.current?.focus(); // focus after enable
                }, 0);
              }}
            >
              Not this number?
            </button>
          )}
          {error != "" && <div className="text-[#f93c6a]">{error}</div>}
        </div>
      </div>
      <button
        className="w-3xs py-3 bg-[#1fa637] rounded-md text-white font-bold cursor-pointer"
        onClick={handleSave}
      >
        Save and continue
      </button>
    </div>
  );
};

export default ContactInfo;
