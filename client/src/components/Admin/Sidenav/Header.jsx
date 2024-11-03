import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import userIcon from "../../../assets/userIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import api from "../../../api";
import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";


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
    <div className="sm: xl: z-1 absolute top-0 flex w-screen items-center justify-between bg-green shadow-outerShadow">
      <h1 className="xl: m-1 ml-[18.5em] text-base font-bold text-white sm:hidden lg:inline xm:hidden">
        {pageName}
      </h1>
      <button 
          className="xm:block text-2xl sm:block ml-5 lg:hidden xl:hidden"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} color="white"/>
      </button>

      <div className="relative">
        <button onClick={toggleUser}>
          <img src={userIcon} className="m-2 mr-5 md:inline" alt="User" />
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
