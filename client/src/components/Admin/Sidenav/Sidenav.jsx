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
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const Sidenav = () => {
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleManagementDropdown = () => {
    setIsManagementOpen(!isManagementOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserOpen(!isUserOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav
        className={`z-3 absolute top-0 min-h-screen w-[16em] font-noto bg-white pt-8 text-black shadow-outerShadow`}
      >
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
              <span className="text-sidenavTextSize ml-3">View Modules</span>
            </button>
            {isManagementOpen && (
              <ul className="mt-2 flex w-full flex-col gap-2 rounded-lg bg-gray-100">
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
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
