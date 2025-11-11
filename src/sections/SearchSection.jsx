import { useState } from "react";

const SearchSection = () => {
  
  const [tab, setTab] = useState("hourly");

  return (
    <section className="bg-white border border-primary/30 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-lg font-sans -mt-10 relative z-10">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        {["Hourly", "Daily", "Monthly", "Airport"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item.toLowerCase())}
            className={`px-4 py-2 font-medium ${
              tab === item.toLowerCase()
                ? "border-b-4 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Form */}
      
      
    </section>
  );
};

export default SearchSection;
