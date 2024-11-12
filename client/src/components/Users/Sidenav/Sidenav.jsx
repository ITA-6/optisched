import { Outlet, Link } from "react-router-dom";
import optisched from "../../../assets/optisched.png";
import pncHeader from "../../../assets/pncHeader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faBarsProgress, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "./SidenavContext/SidenavContext";
import { jwtDecode } from "jwt-decode";
const Sidenav = () => {

  const {user_type} = jwtDecode(localStorage.getItem("access_token"));

  const { isSidebarOpen, toggleSidebar, isHoverOn, hoverOn, hoverOff} = useSidebar();
  console.log(isHoverOn + " hover is on")
  console.log(isSidebarOpen + "side is on")
  return (
    <>
      <nav
        className={` font-noto ${((!isHoverOn && isSidebarOpen) || isHoverOn )? "lg:hover:w-[16em]" : "lg:w-20 xm:w-0 sm:w-0"} z-50 fixed top-0 h-screen font-noto bg-white pt-4 text-black shadow-outerShadow ${isSidebarOpen ? "w-[16em]": "lg:w-20"} ease-linear duration-200 overflow-auto `}
        onMouseEnter={hoverOn}
        onMouseLeave={hoverOff}
      >
        <div className={`justify-end  items-center text-block  ${isHoverOn || isSidebarOpen ? "flex" : "hidden"}`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon 
          icon={faXmark}
          className="xm:text-xl pr-3" />
        </div>
        <div 
         className={`flex-col ${!isSidebarOpen && !isHoverOn ? "mt-20" : "mt-0"} ease-linear duration-300`}
        >
          <div className={`flex justify-center ease-linear duration-500`}>
            <img src={optisched} alt="OptiSched Logo" className={`h-16 w-auto ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`} />
          </div>
          <div className={`mb-8 mt-0 flex justify-center ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>
            <img src={pncHeader} alt="Pnc Header" className="h-10 w-auto" />
          </div>
          <div className={`mb-4 flex justify-center bg-grayish ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>
            <h1 className="m-2 text-md">Scheduling System</h1>
          </div>
          <ul className="flex flex-col gap-2 px-4">
            {user_type === "P" ? (
              <>
                <li className="w-full">
              <Link
                to="professor/generate"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                 <FontAwesomeIcon icon={faGears} className={`${!isSidebarOpen  ? "xm:hidden sm:hidden lg:flex"  : ""}`} />
                <span className={`text-sidenavTextSize ml-3  ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>Generate</span>
              </Link>
              </li>
              <li className="w-full">
                <Link
                  to="professor/schedule"
                  className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faBarsProgress} className={`${!isSidebarOpen  ? "xm:hidden sm:hidden lg:flex"  : ""}`} />
                  <span className={`text-sidenavTextSize ml-5 ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>Schedule</span>
                </Link>
              </li>
              </>
            ) : (
              <li className="w-full">
                <Link
                  to="professor/generate"
                  className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faGears} className={`${!isSidebarOpen  ? "xm:hidden sm:hidden lg:flex"  : ""}`} />
                  <span className={`text-sidenavTextSize ml-3  ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>Schedule</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
