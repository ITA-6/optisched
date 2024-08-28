import { Outlet, Link } from "react-router-dom";
import optisched from "../../../assets/optisched.png";
import pncHeader from "../../../assets/pncHeader.png";
import dash from "../../../assets/dash.svg";
import user from "../../../assets/user.png";
import generate from "../../../assets/generate.png";
import parameters from "../../../assets/parameters.png";
import menu from "../../../assets/menu.png";
import { useState } from "react";

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
        className={`z-3 absolute min-h-screen w-[16em] bg-white pt-8 text-black`}
      >
        <div className="flex justify-center">
          <img src={optisched} alt="OptiSched Logo" className="h-16 w-auto" />
        </div>
        <div className="mb-8 mt-0 flex justify-center">
          <img src={pncHeader} alt="Pnc Header" className="h-10 w-auto" />
        </div>
        <div className="mb-4 flex justify-center bg-grayish">
          <h1 className="m-2 text-xl">Scheduling System</h1>
        </div>
        <ul className="flex flex-col gap-4 px-4">
          <li className="w-full">
            <Link
              to="dashboard"
              className="flex w-full items-center rounded-lg px-1 py-4 hover:bg-dark-green"
            >
              <img src={dash} alt="Dashboard Icon" className="h-10 w-10" />
              <span className="text-md ml-4">Dashboard</span>
            </Link>
          </li>
          <li className="w-full">
            <button
              type="button"
              onClick={toggleUserDropdown}
              className="flex w-full items-center rounded-lg px-2 py-4 hover:bg-dark-green"
            >
              <img src={user} alt="Users Icon" className="h-7 w-7" />
              <span className="text-md ml-6">Users</span>
            </button>
            {isUserOpen && (
              <ul className="mt-2 flex w-full flex-col gap-2 rounded-lg bg-dark-green">
                <li className="w-full">
                  <Link
                    to="user"
                    className="hover:bg-green-700 flex w-full items-center rounded-lg px-4 py-2"
                  >
                    <span className="ml-2 text-sm">Manage</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="w-full">
            <Link
              to="generate"
              className="flex w-full items-center rounded-lg px-2 py-4 hover:bg-dark-green"
            >
              <img src={generate} alt="Generate Icon" className="h-8 w-8" />
              <span className="text-md ml-5">Generate Schedule</span>
            </Link>
          </li>
          <li className="w-full">
            <Link
              to="parameter"
              className="flex w-full items-center rounded-lg px-2 py-4 hover:bg-dark-green"
            >
              <img
                src={parameters}
                alt="Parameters Icon"
                className="h-10 w-10"
              />
              <span className="text-md ml-4">Parameters</span>
            </Link>
          </li>
          <li className="w-full">
            <button
              type="button"
              onClick={toggleManagementDropdown}
              className="flex w-full items-center rounded-lg px-2 py-4 hover:bg-dark-green"
            >
              <img src={menu} alt="Menu Icon" className="h-9 w-9" />
              <span className="text-md ml-4">Management Systems</span>
            </button>
            {isManagementOpen && (
              <ul className="mt-2 flex w-full flex-col gap-2 rounded-lg bg-dark-green">
                <li className="w-full">
                  <Link
                    to="management/professor"
                    className="hover:bg-green-700 mt-2 flex w-full items-center rounded-lg px-4 py-2"
                  >
                    <span className="ml-4 text-sm">Professor</span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="management/section"
                    className="hover:bg-green-700 flex w-full items-center rounded-lg px-4"
                  >
                    <span className="ml-4 text-sm">Section</span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="management/classroom"
                    className="hover:bg-green-700 flex w-full items-center rounded-lg px-4"
                  >
                    <span className="ml-4 text-sm">Classroom</span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="management/course"
                    className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4"
                  >
                    <span className="ml-4 text-sm">Course</span>
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
