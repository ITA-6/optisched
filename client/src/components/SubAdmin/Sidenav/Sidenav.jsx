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
        className={`z-3 absolute top-0 min-h-screen w-[16em] bg-white pt-8 text-black`}
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
                to="management/professor"
                className="hover:bg-green-700 flex w-full items-center rounded-lg px-4 text-black"
              >
                <span className="ml-4 text-sm">Professor</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/section"
                className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 py-1 text-black"
              >
                <span className="ml-4 text-sm">Section</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/classroom"
                className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
              >
                <span className="ml-4 text-sm">Classroom</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/course"
                className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
              >
                <span className="ml-4 text-sm">Course</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/building"
                className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
              >
                <span className="ml-4 text-sm">Building</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/department"
                className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
              >
                <span className="ml-4 text-sm">College</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/program"
                className="hover:bg-green-700 mb-2 flex w-full items-center rounded-lg px-4 text-black"
              >
                <span className="ml-4 text-sm">Department</span>
              </Link>
            </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
