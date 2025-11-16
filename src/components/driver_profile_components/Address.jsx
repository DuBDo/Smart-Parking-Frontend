
function Address() {
    return (
        <div className="bg-white rounded shadow-md shadow-gray-400 mt-8 py-9 px-10">
            <h1 className="font-medium text-lg">Address</h1>
            <p className="mt-3 text-[#999999] text-[15px]">This is for your personal address. Please ensure this is up-to-date.</p>

            <div className="mt-6 flex flex-col">
                <label htmlFor="province" className="text-[#666666] font-medium">Province</label>
                <input type="province" 
                    id="province"
                    className="w-2xs py-2 px-3 text-[#212121] text-lg border border-[#e5e5e5] rounded focus:outline-none focus:ring-2 focus:ring-green-500 "
                    // onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Address