import { Outlet, Link } from "react-router-dom";
import optisched from "../../../assets/optisched.png";
import pncHeader from "../../../assets/pncHeader.png";
import section from "../../../assets/section.png"
import education from "../../../assets/educationBlack.png"
import educationalPrograms from "../../../assets/educationaPrograms.png"
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faBuildingUser, faUser,faBookOpen} from "@fortawesome/free-solid-svg-icons";

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
        className={`z-3 absolute top-0 min-h-screen w-[16em] bg-white pt-8 text-black shadow-outerShadow`}
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
                to="management/professor"
                 className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faUser} size="lg" className="w-6 h-6" />
                <span className="text-sidenavTextSize ml-3">Professor</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/section"
                 className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <img src={section} alt="" className="w-6 h-6" />
                <span className="text-sidenavTextSize ml-3">Section</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/classroom"
                 className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faBuildingUser} size="lg" className="w-6 h-6"/>
                <span className="text-sidenavTextSize ml-3">Classroom</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/course"
                 className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                 <FontAwesomeIcon icon={faBookOpen} style={{color: "#000000",}} />
                <span className="text-sidenavTextSize ml-3">Course</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/building"
                 className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faBuilding} size="lg" className="w-6 h-6"/>
                <span className="text-sidenavTextSize ml-3">Building</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/college"
                 className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                 <img src={education} alt="" className="w-6 h-6" />
                <span className="text-sidenavTextSize ml-3">College</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="management/program"
                className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                 <img src={educationalPrograms} alt="" className="w-6 h-6" />
                <span className="text-sidenavTextSize ml-3">Program</span>
              </Link>
            </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
