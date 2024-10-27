import { useEffect, useState } from "react";

import BuildingTable from "./Files/BuildingTable";
import SearchField from "./Files/SearchField";
import api from "../../../../api";

const ViewBuilding = () => {
  const [buildings, setBuildings] = useState([]);
  const totalRows = (buildings.length < 10) ? 10 : buildings.length;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("buildings/");
      setBuildings(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(buildings.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
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
