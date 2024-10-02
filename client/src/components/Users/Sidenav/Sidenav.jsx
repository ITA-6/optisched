import { Outlet, Link } from "react-router-dom";
import optisched from "../../../assets/optisched.png";
import pncHeader from "../../../assets/pncHeader.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears,faBarsProgress } from "@fortawesome/free-solid-svg-icons";

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
          <h1 className="m-2 text-base">Scheduling System</h1>
        </div>
        <ul className="flex flex-col gap-2 px-4">
            <li className="w-full">
              <Link
                to="generate"
                   className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faGears} size="xl" color="gray"  className="w-5 h-6"/>
                <span className="ml-4 text-sidenavTextSize">Generate</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="schedule"
                   className="flex w-full items-center rounded-lg px-1 py-2 hover:bg-gray-200"
              >
                 <FontAwesomeIcon icon={faBarsProgress} size="xl" color="gray" className="w-5 h-6"/>
                <span className="ml-5 text-sidenavTextSize">My Schedule</span>
              </Link>
            </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
