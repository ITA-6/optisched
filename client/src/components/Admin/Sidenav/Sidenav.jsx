import { Link } from "react-router-dom";

import opti from "../../../assets/opti.png";
import dash from "../../../assets/dash.svg";
import user from "../../../assets/user.png";
import generate from "../../../assets/generate.png";
import parameters from "../../../assets/parameters.png";
import menu from "../../../assets/menu.png";

const Sidenav = () => {
  return (
    <nav className="absolute min-h-screen w-[7em] bg-green pt-8">
      <div className="mb-8 flex justify-center">
        <img src={opti} alt="OptiSched Logo" />
      </div>
      <ul className="flex flex-col items-center gap-4">
        <li className="w-full bg-dark-green">
          <Link to="#" className="flex flex-col items-center py-2">
            <img src={dash} alt="Dashboard Icon" className="h-9 w-9" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center py-2">
            <img src={user} alt="Users Icon" className="h-7 w-7" />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center">
            <span className="text-center leading-5">Manage</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center py-2">
            <img src={generate} alt="Dashboard Icon" className="h-8 w-8" />
            <span className="text-center leading-5">Generate Schedule</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center py-2">
            <img src={parameters} alt="Parameters Icon" className="h-10 w-10" />
            <span>Parameters</span>
          </Link>
        </li>
        <li>
          <button type="button" className="flex flex-col items-center py-2">
            <img src={menu} alt="Menu Icon" className="h-9 w-9" />
            <span className="text-center leading-5">Management Systems</span>
          </button>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center">
            <span className="text-center leading-5">Professor</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center">
            <span className="text-center leading-5">Section</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center">
            <span className="text-center leading-5">Classroom</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center">
            <span className="text-center leading-5">Course</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
