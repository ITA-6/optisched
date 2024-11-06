import { useState } from "react";
import userIcon from "../../../assets/userIcon.png";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { useSidebar } from "./SidenavContext/SidenavContext"; // Import useSidebar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({ pageName }) => {
  const [isUserOpen, setUserOpen] = useState(false);
  const toggleUser = () => setUserOpen(!isUserOpen);
  const navigate = useNavigate();

  const {isSidebarOpen, toggleSidebar} = useSidebar();

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
    <div className={`sm: xl: z-10 fixed top-0 flex w-screen items-center justify-between bg-green shadow-outerShadow font-noto lg:py-2`}>
      <h1 className={`xl: m-1 ml-[18.5em] text-base font-bold text-white sm:hidden lg:inline xm:hidden ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} ease-linear duration-200`}>
        {pageName}
      </h1>
      <button 
          className="xm:block xm:text-lg text-2xl sm:block ml-5 lg:hidden xl:hidden"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} 
        color="white"
        className="xm:text-xs"
        />
      </button>

      <div className="relative">
        <button onClick={toggleUser}>
          <img src={userIcon} className="mr-5 xm:w-4 md:mx-6 md:w-10  md:inline" alt="User" />
        </button>
        <ul
          className={`${isUserOpen ? "absolute right-8 top-20 w-52" : "hidden"} grid items-center justify-center rounded-md bg-white`}
        >
          <li>
            <a href="">Change Password</a>
          </li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;

