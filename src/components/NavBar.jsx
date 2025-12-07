import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa6"; // Using Fa6 which is fine
import { logout } from "../redux/userSlice";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  // NEW STATE: State for the user profile dropdown
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  const navLinks = [
    { path: "/dashboard/rent-space", label: "Rent Out Your Space" },
    { path: "/airports", label: "Airports" },
    { path: "/help", label: "Help" },
  ];

  const authLinks = user
    ? [
        // Dropdown trigger link
        { path: "", label: user.firstName, isDropdown: true },
      ]
    : [
        { path: "/login", label: "Login" },
        { path: "/signup", label: "Signup" },
      ];

  // User Menu Dropdown Links (when logged in)
  const userDropdownLinks = [
    { path: "/dashboard/bookings-made", label: "Bookings made" },
    { path: "/dashboard/bookings-received", label: "Bookings received" },
    { path: "/dashboard/messages", label: "Messages" },
    { path: "/dashboard/parking-spaces", label: "Manage my spaces" },
    { path: "/dashboard/billings", label: "Billings" },
    { path: "/dashboard/profile", label: "My profile" },
    { path: "#", label: "Log out" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-[#f6f8fb]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/home" className="text-3xl font-extrabold text-[#1fa637]">
          Smart<span className="font-bold text-[#3685d4]">Park</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {[...navLinks, ...authLinks].map((link) =>
            link.isDropdown ? (
              // 1 & 2. Dropdown Logic (for logged-in user)
              <div
                key={link.label}
                className={`cursor-pointer font-medium ${
                  active == link.label
                    ? "text-[#1fa637] font-semibold"
                    : "text-gray-700 hover:text-[#91ac96]"
                }`}
                onClick={() => setActive(link.label)} // Toggle state
              >
                <div className="text-base flex items-center gap-2 space-x-1 hover:text-[#91ac96]">
                  <span>{link.label}</span>
                  <FaChevronDown
                    className={`text-xs`}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  />
                </div>

                {/* Dropdown Content */}
                {isUserMenuOpen && (
                  <div className="absolute flex flex-col h-auto top-full right-0 mt-3 w-52 bg-white max-w-md border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden">
                    {userDropdownLinks.map((dropdownLink) => (
                      <Link
                        key={dropdownLink.path}
                        to={dropdownLink.path}
                        className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 no-underline"
                        onClick={(e) => {
                          if (dropdownLink.label == "Log out") {
                            e.preventDefault();
                            handleLogOut();
                          } else {
                            setIsUserMenuOpen(!isUserMenuOpen);
                            setOpen(false);
                          }
                        }}
                      >
                        {dropdownLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // 3. Regular NavLink Logic (with no-underline added)
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 **no-underline** ${
                  active == link.label
                    ? "text-[#1fa637] font-semibold"
                    : "text-gray-700 hover:text-[#91ac96]"
                }`}
                onClick={() => setActive(link.label)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          {[...navLinks, ...authLinks].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-3 text-base font-medium no-underline ${
                  isActive
                    ? "text-[#1fa637] bg-gray-50 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#4d7354]"
                }`
              }
              onClick={() => {
                if (link.label == "Log out") {
                  handleLogOut();
                } else {
                  setOpen(false);
                }
              }}
            >
              {link.label}
              {/* 4. Removed the incorrect line here: {link.path == '/account',} */}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
