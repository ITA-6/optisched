import SearchField from "./Files/SearchField";
import ClassroomTable from "./Files/ClassroomTable";
import { useState, useEffect } from "react";
import api from "../../../../api";
import {useSidebar} from "../../../Users/Sidenav/SidenavContext/SidenavContext"

const ViewClassroom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const {isSidebarOpen} = useSidebar();

  const [filtered, setFiltered] = useState("");

  const getAllFloor = [
    ...new Set(classrooms.map((classroom) => classroom.floor)),
  ];

  const classroom = classrooms.filter(
    (classroom) => filtered === "" || classroom.floor === +filtered
  );



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
        <SearchField setFiltered={setFiltered} getAllFloor={getAllFloor}/>
        <div className={`mr-5 h-full grid-in-userTable ${(classrooms.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <ClassroomTable
           classroom={classroom}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewClassroom;
