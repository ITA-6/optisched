import { useEffect, useState } from "react";
import userIcon from "../../../assets/userIcon.png";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { useSidebar } from "./SidenavContext/SidenavContext"; // Import useSidebar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const Header = ({ pageName }) => {
  const [isUserOpen, setUserOpen] = useState(false);
  const toggleUser = () => setUserOpen(!isUserOpen);
  const navigate = useNavigate();
  const [name, setName] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("schedule/professor/");
        setName(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const token = jwtDecode(localStorage.getItem("access_token"));
  console.log(token);
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

  return (
    <div
      className={`sm: xl: fixed top-0 z-10 flex w-screen items-center justify-between bg-green font-noto shadow-outerShadow lg:py-2`}
    >
      <h1
        className={`xl: m-1 ml-[18.5em] text-base font-bold text-white sm:hidden lg:inline xm:hidden ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        {`${token.first_name} ${token.middle_name} ${token.last_name}`}
        <span className="ml-2 text-xs italic">
          Professor.No {token.username}
        </span>
      </h1>
      <button
        className="ml-5 text-2xl sm:block lg:hidden xl:hidden xm:block xm:text-lg"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={faBars}
          color="white"
          className="sm:text-sm md:text-base xm:text-xs"
        />
      </button>

      <div className="relative">
        <button onClick={toggleUser}>
          <img
            src={userIcon}
            className="mr-5 sm:w-6 md:mx-6 md:inline md:w-7 lg:w-10 xm:w-4"
            alt="User"
          />
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
