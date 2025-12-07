import { Link, useLocation } from "react-router";

function DashboardSideBar() {
  const location = useLocation();
  const pathName = location.pathname.split("/")[2];
  const sideNav = [
    { path: "/dashboard/bookings-made", label: "Bookings made" },
    { path: "/dashboard/messages", label: "Messages" },
    { path: "/dashboard/billings", label: "Billings" },
    { path: "/dashboard/profile", label: "My profile" },
    { path: "#", label: "Log out" },
  ];

  return (
    <div className="w-60 bg-[#eff4f4] pt-28 px-7">
      <div>
        {sideNav.map((item) => (
          <Link
            key={item.path}
            className={`text-xl block my-4 ${
              item.path.split("/")[2] == pathName
                ? "text-[#3e3e3e] font-medium"
                : "text-[#999999]"
            }`}
            to={item.path}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardSideBar;
