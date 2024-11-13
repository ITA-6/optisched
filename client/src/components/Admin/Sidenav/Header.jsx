import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import userIcon from "../../../assets/userIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import api from "../../../api";
import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";

const Header = ({ pageName }) => {
  const [isUserOpen, setUserOpen] = useState(false);
  const toggleUser = () => setUserOpen(!isUserOpen);
  const navigate = useNavigate();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

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

  const handleChangePassword = () => {
    navigate("changepassword");
  };

  return (
    <div
      className={`sm: xl: fixed top-0 z-10 flex w-screen items-center justify-between bg-green font-noto shadow-outerShadow`}
    >
      <h1
        className={`xl: m-1 ml-[18.5em] text-base font-bold text-white sm:hidden lg:inline xm:hidden ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        {pageName}
      </h1>
      <button
        className="ml-5 text-2xl sm:block lg:hidden xl:hidden xm:block xm:text-lg"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} color="white" />
      </button>

      <div className="relative">
        <button onClick={toggleUser}>
          <img
            src={userIcon}
            className="m-2 mr-5 md:mx-6 md:inline md:w-10 xm:h-10"
            alt="User"
          />
        </button>
        <ul
          className={`${isUserOpen ? "absolute right-8 top-20 w-52" : "hidden"} grid items-center justify-center rounded-md bg-white`}
        >
          <li>
            <button className="" onClick={handleChangePassword}>
              Change Password
            </button>
          </li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
