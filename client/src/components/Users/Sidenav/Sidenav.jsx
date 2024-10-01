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
                to="generate"
                className="hover:bg-green-700 flex w-full items-center rounded-lg px-4 text-black"
              >
                <FontAwesomeIcon icon={faGears} size="xl" color="gray" />
                <span className="ml-4 text-sm">Generate</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="schedule"
                className="hover:bg-green-700 flex w-full items-center rounded-lg px-4 text-black"
              >
                 <FontAwesomeIcon icon={faBarsProgress} size="xl" color="gray"/>
                <span className="ml-5 text-sm">My Schedule</span>
              </Link>
            </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidenav;
