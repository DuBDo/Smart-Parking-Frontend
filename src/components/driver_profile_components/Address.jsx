import { useState } from "react"
import {locations} from "../../constants/locations"

console.log(locations)
function Address() {
    const [province, setProvince] = useState('Bagmati Province');
    const [district, setDistrict] =useState('');
    const [LGV, setLGV] = useState('');
    const [ward, setWard] = useState('');
    const [address, setAddress] = useState('');

    return null ;
        (
        <div className="bg-white rounded shadow-md shadow-gray-400 mt-8 py-9 px-10">
            <h1 className="font-medium text-lg">Address</h1>
            <p className="mt-3 text-[#999999] text-[15px]">This is for your personal address. Please ensure this is up-to-date.</p>

            <div className="mt-6 flex flex-col">
                <label htmlFor="province" className="text-[#666666] font-medium">Province</label>
                <select type="province" 
                    className="w-2xs py-2 px-3 text-[#212121] text-lg border border-[#e5e5e5] rounded focus:outline-none focus:ring-2 focus:ring-green-500 "
                    id="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    defaultValue='Select Province'
                >
                    {
                        Object.keys(locations).map((prov)=>{
                            return <option value={prov}>{prov}</option>
                        })
                    }
                </select>
            </div>

            <div className="mt-6 flex flex-col">
                <label htmlFor="district" className="text-[#666666] font-medium">District</label>
                <select  
                    className="w-2xs py-2 px-3 text-[#212121] text-lg border border-[#e5e5e5] rounded focus:outline-none focus:ring-2 focus:ring-green-500 "
                    id="district"
                    // onChange={(e) => setFirstName(e.target.value)}
                    defaultValue='Select District'
                >
                    {

                        Object.keys(locations).map((prov)=>{
                            if(prov == province)    
                            return <option value={location.province}>{location.province}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default Address