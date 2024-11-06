import { useEffect, useState } from "react";

import BuildingTable from "./Files/BuildingTable";
import SearchField from "./Files/SearchField";
import api from "../../../../api";

import {useSidebar} from "../../../Users/Sidenav/SidenavContext/SidenavContext"

const ViewBuilding = () => {
  const [buildings, setBuildings] = useState([]);
  const totalRows = (buildings.length < 10) ? 10 : buildings.length;

  const {isSidebarOpen} = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("buildings/");
      setBuildings(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen? "lg:ml-[18rem]" :"lg:ml-32"} ease-linear duration-200`}>
        <SearchField />
        <div className={`sm:ml-10 lg:ml-0 sm:mr-3 mr-5 h-full grid-in-userTable ${(buildings.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>

          <BuildingTable
            buildings={buildings}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewBuilding;
