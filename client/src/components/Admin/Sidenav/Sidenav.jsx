import { Outlet, Link } from "react-router-dom";
import optisched from "../../../assets/optisched.png";
import pncHeader from "../../../assets/pncHeader.png";
import dash from "../../../assets/dash.svg";
import user from "../../../assets/user.png";
import generate from "../../../assets/generate.png";
import parameters from "../../../assets/parameters.png";
import menu from "../../../assets/menu.png";
import education from "../../../assets/education.png"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faAngleDown, faAngleRight, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";

const Sidenav = () => {

  const { isSidebarOpen, toggleSidebar, isHoverOn, hoverOn, hoverOff} = useSidebar();
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const toggleManagementDropdown = () => {
    setIsManagementOpen(!isManagementOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserOpen(!isUserOpen);
  };


  return (
    <>
      <nav
        className={` font-noto ${((!isHoverOn && isSidebarOpen) || isHoverOn )? "lg:hover:w-[16em]" : "lg:w-20 xm:w-0 sm:w-0"} z-50 fixed top-0 h-screen font-noto bg-white pt-4 text-black shadow-outerShadow ${isSidebarOpen ? "w-[16em]": "lg:w-20"} ${isManagementOpen ? "xm:overflow-auto" : "overflow-hidden"} ease-linear duration-200 `}
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
            <li className="w-full">
              <Link
                to="dashboard"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <img src={dash} alt="Dashboard Icon" className="w-7 h-6" />
                <span className={`text-sidenavTextSize ml-3  ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>Dashboard</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="user"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={user} alt="Users Icon" className="h-5 w-5" />
                <span className={`text-sidenavTextSize ml-5 ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>Users</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="generate"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={generate} alt="Generate Icon" className="h-6 w-5" />
                <span className={`text-sidenavTextSize ml-3.5 ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>Generate Schedule</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="curriculum"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img
                  src={parameters}
                  alt="Parameters Icon"
                  className="h-6 w-6"
                />
                <span className={`text-sidenavTextSize ml-2 ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"} `}>Curriculum</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="view/college"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={education} alt="" className="h-7 w-5" />
                <span className={`ml-4 text-sidenavTextSize  ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"} `}>College</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="view/constraint"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faSliders} size="lg" />
                <span className={`ml-4 text-sidenavTextSize  ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex": "hidden"}`}>Constraints</span>
              </Link>
            </li>
            <li className="w-full">
              <button
                type="button"
                onClick={toggleManagementDropdown}
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={menu} alt="Menu Icon" className="h-6 w-5" />
                {((!isHoverOn && isSidebarOpen) || isHoverOn ) && (
                  <>
                   <span className="text-sidenavTextSize ml-3 mr-[3.5rem]">View Modules</span>
                  <FontAwesomeIcon 
                  icon={faAngleRight}
                  className={`  duration-300 ${isManagementOpen ? "rotate-90" : "rotate-0"}`}
                /> 
                </>
                )}
              </button>
              

              {/* management Open */}

              <ul className={`mt-2 w-full flex-col gap-2 rounded-lg bg-gray-100 ease-linear duration-200 delay-75 overflow-hidden ${isManagementOpen ? "flex max-h-56 mb-5" : "max-h-0"} ${((!isHoverOn && isSidebarOpen) || isHoverOn ) ? "flex" : "hidden"}`}>
                  <li className="w-full">
                    <Link
                      to="view/professor"
                      className="hover:bg-green-700 flex w-full items-center rounded-lg px-4 pt-2 text-black"
                    >
                      <span className="ml-4 text-sidenavTextSize">Professor</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="view/section"
                      className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 py-1 text-black"
                    >
                      <span className="ml-4 text-sidenavTextSize">Section</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="view/classroom"
                      className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
                    >
                      <span className="ml-4 text-sidenavTextSize">Classroom</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="view/course"
                      className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
                    >
                      <span className="ml-4 text-sidenavTextSize">Course</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="view/building"
                      className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
                    >
                      <span className="ml-4 text-sidenavTextSize">Building</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="view/program"
                      className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
                    >
                      <span className="ml-4 text-sidenavTextSize">Program</span>
                    </Link>
                  </li>
                </ul>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
