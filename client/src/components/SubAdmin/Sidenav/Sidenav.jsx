import { Outlet, Link } from "react-router-dom";
import optisched from "../../../assets/optisched.png";
import pncHeader from "../../../assets/pncHeader.png";
import section from "../../../assets/section.png";
import educationalPrograms from "../../../assets/educationaPrograms.png";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBuildingUser,
  faUser,
  faBookOpen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Sidenav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHoverOn, setIsHoverOn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hoverOn = () => {
    setIsHoverOn(true);
  };

  const hoverOff = () => {
    setIsHoverOn(false);
  };

  return (
    <>
      <nav
        className={`font-noto ${
          isSidebarOpen || isHoverOn
            ? "sm:w-[16em] lg:w-[16em]"
            : "sm:w-0 lg:w-20"
        } fixed top-0 z-50 h-screen overflow-y-auto bg-white pt-4 text-black shadow-outerShadow duration-200 ease-out`}
        onMouseEnter={hoverOn}
        onMouseLeave={hoverOff}
      >
        <div
          className={`items-center justify-end px-3 ${
            isHoverOn || isSidebarOpen ? "flex" : "hidden"
          }`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faXmark} className="cursor-pointer text-xl" />
        </div>
        <div
          className={`flex-col ${
            !isSidebarOpen && !isHoverOn ? "mt-20" : "mt-0"
          } duration-300 ease-linear`}
        >
          <div className="flex justify-center duration-500 ease-linear">
            <img
              src={optisched}
              alt="OptiSched Logo"
              className={`h-16 w-auto ${isSidebarOpen || isHoverOn ? "block" : "hidden"}`}
            />
          </div>
          <div
            className={`mb-8 mt-0 flex justify-center ${
              isSidebarOpen || isHoverOn ? "block" : "hidden"
            }`}
          >
            <img src={pncHeader} alt="PNC Header" className="h-10 w-auto" />
          </div>
          <div
            className={`mb-4 flex justify-center bg-grayish ${
              isSidebarOpen || isHoverOn ? "block" : "hidden"
            }`}
          >
            <h1 className="text-md m-2">Scheduling System</h1>
          </div>
          <ul className="flex flex-col gap-2 px-4">
            <li className="w-full">
              <Link
                to="management/professor"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faUser} size="lg" className="h-6 w-6" />
                <span
                  className={`ml-5 text-sidenavTextSize ${
                    isSidebarOpen || isHoverOn ? "block" : "hidden"
                  }`}
                >
                  Professor
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/section"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <img src={section} alt="Section Icon" className="h-5 w-6" />
                <span
                  className={`ml-5 text-sidenavTextSize ${
                    isSidebarOpen || isHoverOn ? "block" : "hidden"
                  }`}
                >
                  Section
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/classroom"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon
                  icon={faBuildingUser}
                  size="lg"
                  className="h-6 w-6"
                />
                <span
                  className={`ml-5 text-sidenavTextSize ${
                    isSidebarOpen || isHoverOn ? "block" : "hidden"
                  }`}
                >
                  Classroom
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/course"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon
                  icon={faBookOpen}
                  style={{ color: "#000000" }}
                />
                <span
                  className={`ml-7 text-sidenavTextSize ${
                    isSidebarOpen || isHoverOn ? "block" : "hidden"
                  }`}
                >
                  Course
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/building"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  size="lg"
                  className="h-6 w-6"
                />
                <span
                  className={`ml-6 text-sidenavTextSize ${
                    isSidebarOpen || isHoverOn ? "block" : "hidden"
                  }`}
                >
                  Building
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/program"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <img
                  src={educationalPrograms}
                  alt="Program Icon"
                  className="h-6 w-6"
                />
                <span
                  className={`ml-6 text-sidenavTextSize ${
                    isSidebarOpen || isHoverOn ? "block" : "hidden"
                  }`}
                >
                  Program
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
