import { useState } from "react";
import userIcon from "../../../assets/userIcon.png";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { useSidebar } from "./SidenavContext/SidenavContext"; // Import useSidebar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({ pageName }) => {
  const [isUserOpen, setUserOpen] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useSidebar(); // Get toggleSidebar from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("account/logout/", {
        refresh: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sm:p-2 md:p-1 xl:z-1 p-0 absolute top-0 flex w-screen items-center justify-between bg-green shadow-outerShadow">
      <button 
        className="xm:block xm:text-xs sm:block ml-5 lg:hidden xl:hidden"
        onClick={toggleSidebar}
        >
          <FontAwesomeIcon 
          icon={faBars} 
          color="white" />
        </button>
      <h1 
      className={`ease-in-out duration-300 md:m-1 m-3 text-base font-bold text-white sm:hidden lg:inline xm:hidden ${isSidebarOpen ? "pl-[15em]" : "lg:ml-20"}`}
      >
        {pageName}
      </h1>

      <div className="relative flex xm:mb-[2px] xm:px-4">
        <button 
        className=" xm:w-5 sm:w-10 xl:w-8 "
        onClick={() => setUserOpen(!isUserOpen)}
        >
          <img src={userIcon} alt="userIcon" className="w-full" />
        </button>
        <ul className={`${isUserOpen ? "absolute right-8 top-20 w-52" : "hidden"} grid items-center justify-center rounded-md bg-white`}>
          <li><a href="">Change Password</a></li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
