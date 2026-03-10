import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const activeStyle = "text-blue-600 font-bold underline underline-offset-4";
  const inactiveStyle = "text-gray-600 font-medium hover:text-blue-500";

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center border-b">
      <div className="space-x-8">
        <NavLink 
          to="/dashboard" 
          end 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/dashboard/water" 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
        >
          Water Tracker
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;