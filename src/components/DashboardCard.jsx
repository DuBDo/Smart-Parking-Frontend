import { useNavigate } from "react-router"

function DashboardCard({icon: Icon, heading, content, navigateto}) {
    const navigate = useNavigate();
  return (
    <div className="bg-white py-5 px-4 max-w-xs flex flex-col rounded shadow-lg cursor-pointer"
        onClick={()=>navigate(navigateto)}>
        <Icon size={20} className='text-green-600'/>
        <h2 className="font-medium mt-5">{heading}</h2>
        <p className="text-sm my-3">{content}</p>
    </div>
  )
}

export default DashboardCard