import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import Logout from "./Logout";
import { useAuth } from "../hooks/useAuth.tsx";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside
      className="flex flex-col md:flex-row md:h-[90%] items-center justify-center w-full md:w-16 pt-0 md:pt-4
      "
    >
      <nav className="h-full  flex flex-wrap flex-row md:flex-col gap-3 pb-3 md:pb-0text-white mt-4 md:mt-0">
        <NavLink to="/" className="flex justify-center">
          <img className="h-8" src="/github.svg" alt="Github Logo" />
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-2 flex justify-center transition-colors duration-200 rounded-lg ${isActive ? "bg-gray-600" : "hover:bg-gray-500"}`
          }
        >
          <IoHomeSharp size={20} />
        </NavLink>

        {user && (
          <NavLink
            to="/likes"
            className={({ isActive }) =>
              `p-2 flex justify-center transition-colors duration-200 rounded-lg ${isActive ? "bg-gray-600" : "hover:bg-gray-500"}`
            }
          >
            <FaHeart size={22} />
          </NavLink>
        )}

        {user && (
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `p-2 flex justify-center transition-colors duration-200 rounded-lg ${isActive ? "bg-gray-600" : "hover:bg-gray-500"}`
            }
          >
            <MdOutlineExplore size={25} />
          </NavLink>
        )}

        {!user && (
          <NavLink
            to="/login"
            className="p-2 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-500"
          >
            <PiSignInBold size={25} />
          </NavLink>
        )}

        {!user && (
          <NavLink
            to="/signup"
            className="flex p-2 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-500"
          >
            <MdEditDocument size={25} />
          </NavLink>
        )}

        {user && (
          <div className="flex justify-center items-center flex-row md:flex-col gap-2 ml-8 md:ml-0 mt-auto">
            <Logout />
          </div>
        )}
      </nav>
    </aside>
  );
};
export default Sidebar;
