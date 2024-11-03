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

  const { isSidebarOpen, toggleSidebar } = useSidebar();
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
        className={`z-3 fixed top-0 h-screen font-noto bg-white pt-4 text-black shadow-outerShadow ${isSidebarOpen ? "w-[16em]": "lg:w-20"} ${isManagementOpen ? "xm:overflow-auto" : "overflow-hidden"} ease-out duration-300 `}
      >
        <div className={`justify-end  items-center text-block md:hidden lg:flex ${isSidebarOpen ? "xm:flex sm:flex md:flex" : "hidden"}`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon 
          icon={faXmark}
          className="xm:text-xl pr-3" />
        </div>
        <div className={`flex-col ${isSidebarOpen ? "flex" : "hidden"}`}>
          <div className="flex justify-center">
            <img src={optisched} alt="OptiSched Logo" className="h-16 w-auto" />
          </div>
          <div className="mb-8 mt-0 flex justify-center">
            <img src={pncHeader} alt="Pnc Header" className="h-10 w-auto" />
          </div>
          <div className="mb-4 flex justify-center bg-grayish">
            <h1 className="m-2 text-md">Scheduling System</h1>
          </div>
          <ul className="flex flex-col gap-2 px-4">
            <li className="w-full">
              <Link
                to="dashboard"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <img src={dash} alt="Dashboard Icon" className="w-7 h-6" />
                <span className="text-sidenavTextSize ml-3 ">Dashboard</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="user"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={user} alt="Users Icon" className="h-5 w-5" />
                <span className="text-sidenavTextSize ml-5">Users</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="generate"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={generate} alt="Generate Icon" className="h-6 w-5" />
                <span className="text-sidenavTextSize ml-3.5">Generate Schedule</span>
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
                <span className="text-sidenavTextSize ml-2">Curriculum</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="view/college"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={education} alt="" className="h-7 w-5" />
                <span className="ml-4 text-sidenavTextSize">College</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="view/constraint"
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
              <FontAwesomeIcon icon={faSliders} size="lg" />
                <span className="ml-4 text-sidenavTextSize">Constraints</span>
              </Link>
            </li>
            <li className="w-full">
              <button
                type="button"
                onClick={toggleManagementDropdown}
                className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-gray-200"
              >
                <img src={menu} alt="Menu Icon" className="h-6 w-5" />
                <span className="text-sidenavTextSize ml-3 mr-[3.5rem]">View Modules</span>
                <FontAwesomeIcon 
                  icon={faAngleRight}
                  className={`  duration-300 ${isManagementOpen ? "rotate-90" : "rotate-0"}`}
                /> 
              </button>
              

              {/* management Open */}

              <ul className={`mt-2 w-full flex-col gap-2 rounded-lg bg-gray-100  ease-in-out duration-500 delay-300 ${isManagementOpen  ? " flex opacity-100 max-h-[14rem] mb-5" : " hidden: opacity-0 max-h-0"}`}>
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
