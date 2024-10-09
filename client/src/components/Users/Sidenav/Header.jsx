import { useState } from "react";
import userIcon from "../../../assets/userIcon.png";
import { useNavigate } from "react-router-dom";

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
    <div className="sm: xl: z-1 absolute top-0 flex w-screen items-center justify-between bg-green shadow-outerShadow">
      <h1 className="xl: m-3 ml-[18.5em] text-base font-bold text-white sm:hidden lg:inline xm:hidden">
        {pageName}
      </h1>
      <button className="md:inline lg:hidden xl:hidden">Menu bar</button>

      <div className="relative mr-5 mt-2">
        <button onClick={toggleUser}>
          <img src={userIcon} alt="userIcon" />
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
