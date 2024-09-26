import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import User from "../../../assets/user.png";
import api from "../../../api";

const Header = ({ pageName }) => {
  const [isUserOpen, setUserOpen] = useState(false);
  const toggleUser = () => setUserOpen(!isUserOpen);
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
    <div className="sm: xl: z-1 absolute top-0 flex w-screen items-center justify-between bg-green">
      <h1 className="xl: m-4 ml-[11.5em] text-2xl font-bold text-white sm:hidden lg:inline xm:hidden">
        {pageName}
      </h1>
      <button className="md:inline lg:hidden xl:hidden">Menu bar</button>

      <div className="relative">
        <button onClick={toggleUser}>
          <img src={User} className="m-4 h-8 w-8 md:inline" alt="User" />
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
