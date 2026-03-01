import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const activeClass = "underline underline-offset-4";
  const baseClass = "text-primary font-semibold";

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="space-x-6">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : baseClass
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/water"
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : baseClass
          }
        >
          Water Tracker
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="bg-primary text-white px-4 py-2 rounded-lg"
      >
        Logout
        
      </button>
    </nav>
  );
}

export default Navbar;