import SearchField from "./Files/SearchField";
import ClassroomTable from "./Files/ClassroomTable";
import { useState, useEffect } from "react";
import api from "../../../../api";
import {useSidebar} from "../../../Users/Sidenav/SidenavContext/SidenavContext"

const ViewClassroom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const {isSidebarOpen} = useSidebar(); 
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFloor, setFilteredFloor] = useState("");

  useEffect(() => {
    // Set initial filtered classrooms when component mounts or classrooms change
    setFilteredClassrooms(classrooms);
  }, [classrooms]);

  // Get all unique floors for the dropdown
  const getAllFloor = [...new Set(classrooms.map((classroom) => classroom.floor))];

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterClassrooms(searchTerm, filteredFloor);
  };

  const handleFloorChange = (e) => {
    const selectedFloor = e.target.value;
    setFilteredFloor(selectedFloor);
    filterClassrooms(searchTerm, selectedFloor);
  };

  const filterClassrooms = (searchTerm, selectedFloor) => {
    const filteredItems = classrooms.filter((classroom) => {
      // Check if classroom matches the selected floor or if no floor is selected
      const matchesFloor = selectedFloor === "" || classroom.floor === +selectedFloor;

      // Check if any relevant field in classroom data starts with the search term
      const matchesSearchTerm =
        (classroom.building_name &&
          classroom.building_name.toLowerCase().startsWith(searchTerm)) ||
        (classroom.number && classroom.number.toString().startsWith(searchTerm)) ||
        (classroom.floor && classroom.floor.toString().startsWith(searchTerm));

      // Return true if both conditions match
      return matchesFloor && matchesSearchTerm;
    });

    setFilteredClassrooms(filteredItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("rooms/");
      setClassrooms(response.data);
    };
    fetchData();
  }, []);

  
  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]": "lg:ml-32"} ease-linear duration-200`}>
        <SearchField handleInputChange={handleInputChange} handleFloorChange={handleFloorChange} getAllFloor={getAllFloor}/>
        <div className={`sm:ml-10 lg:ml-0 sm:mr-3 mr-5 h-full grid-in-userTable ${(filteredClassrooms.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <ClassroomTable
           filteredClassrooms={filteredClassrooms}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewClassroom;
