import SearchField from "./Files/SearchField";
import ClassroomTable from "./Files/ClassroomTable";
import { useState, useEffect } from "react";
import api from "../../../../api";

const ViewClassroom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const totalRows = (classrooms.length < 10) ? 10 : classrooms.length;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("rooms/");
      setClassrooms(response.data);
    };
    fetchData();
  }, []);

  
  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(classrooms.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <ClassroomTable
            classrooms={classrooms}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewClassroom;
