import {Outlet, Link } from "react-router-dom";

import opti from "../../../assets/opti.png";
import dash from "../../../assets/dash.svg";
import user from "../../../assets/user.png";
import generate from "../../../assets/generate.png";

const Sidenav = () => {
  return (
    <>
      <nav className="absolute min-h-screen w-[8.125em] bg-green pt-8">
        <div className="mb-8 flex justify-center">
          <img src={opti} alt="OptiSched Logo" />
        </div>
        <ul className="flex flex-col items-center gap-4">
          <li className="w-full bg-dark-green">
            <Link to="dashboard" className="flex flex-col items-center py-2">
              <img src={dash} alt="Dashboard Icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="user" className="flex flex-col items-center py-2">
              <img src={user} alt="Users Icon" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex flex-col items-center py-2">
              <img src={generate} alt="Dashboard Icon" />
              <span className="text-center leading-5">Generate Schedule</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    
    
    </>
   
  );
};

export default Sidenav;
