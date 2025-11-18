import DashboardCard from "../components/DashboardCard"
import { HiOutlineUser } from "react-icons/hi";
import { PiWallet } from "react-icons/pi";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";


function DriverDashboard() {
  return (
    <div className='bg-[#f5f5f7] px-36 py-6'>
        <h1 className='font-medium text-xl  '>Dashboard</h1>
        <p className='font-medium mt-7'>Account settings</p>

        <div className="mt-4 flex gap-10 justify-between flex-wrap">
            <DashboardCard 
                icon={HiOutlineUser} 
                heading={'Personal info'} 
                content='Your personal information, your vehicles and where we can reach you'
                navigateto='/dashboard/profile'
            />
            <DashboardCard
                icon={PiWallet}
                heading='Payment preferences'
                content = 'How you securely make payments throught SmartPark'
                navigateto='/billing/paymemt'
            />
            <DashboardCard
                icon={PiSlidersHorizontalDuotone}
                heading='Communication preferences'
                content='How often and through which channels you want us to communicate'
                navigateto='/dashboard/profile/communication-settings'
            />
        </div>
    </div>
  )
}

export default DriverDashboard