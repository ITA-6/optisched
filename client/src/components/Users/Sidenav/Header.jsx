import React, { useState } from "react";
import User from "../../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
faUser
const Header = ({ pageName }) => {
  const [isUserOpen, setUserOpen] = useState(false);
  const toggleUser = () => setUserOpen(!isUserOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="sm: xl: z-1 absolute top-0 flex w-screen items-center justify-between bg-green shadow-outerShadow">
      <h1 className="xl: m-3 ml-[18.5em] text-base font-bold text-white sm:hidden lg:inline xm:hidden">
        {pageName}
      </h1>
      <button className="md:inline lg:hidden xl:hidden">Menu bar</button>

      <div className="relative">
        <button onClick={toggleUser}>
          <FontAwesomeIcon icon= {faUser} size="xl" color="white" className="mr-4"/>
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
