import { useEffect, useState } from "react";

import BuildingTable from "./Files/BuildingTable";
import SearchField from "./Files/SearchField";
import api from "../../../../api";

import {useSidebar} from "../../../Users/Sidenav/SidenavContext/SidenavContext"

const ViewBuilding = () => {
  const [buildings, setBuildings] = useState([]);
  const totalRows = (buildings.length < 10) ? 10 : buildings.length;
  const {isSidebarOpen} = useSidebar();

  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");

  const allBuildingNames = [...new Set(buildings.map((building) => building.name))];

  useEffect(() => {
    // Set initial filtered buildings when component mounts or buildings change
    setFilteredBuildings(buildings);
  }, [buildings]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterBuildings(searchTerm, selectedBuilding);
  };

  const handleBuildingChange = (e) => {
    const selected = e.target.value;
    setSelectedBuilding(selected);
    filterBuildings(searchTerm, selected);
  };

  const filterBuildings = (searchTerm, selectedBuilding) => {
    const filteredItems = buildings.filter((building) => {
      // Check if building name matches the selected building, or if no building is selected
      const matchesBuilding = selectedBuilding === "" || building.name === selectedBuilding;

      // Check if any relevant field in building data starts with the search term
      const matchesSearchTerm =
        (building.name && building.name.toLowerCase().startsWith(searchTerm)) ||
        (building.total_rooms && building.total_rooms.toString().startsWith(searchTerm)) ||
        (building.available_rooms && building.available_rooms.toString().startsWith(searchTerm));

      return matchesBuilding && matchesSearchTerm;
    });

    setFilteredBuildings(filteredItems);
  };

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
        <SearchField handleInputChange={handleInputChange} handleBuildingChange={handleBuildingChange} allBuildingNames={allBuildingNames}/>
        <div className={`sm:ml-10 lg:ml-0 sm:mr-3 mr-5 h-full grid-in-userTable ${(filteredBuildings.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>

          <BuildingTable
            filteredBuildings={filteredBuildings}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewBuilding;
