import SearchField from "./Files/SearchField";
import ClassroomTable from "./Files/ClassroomTable";
import { useState, useEffect } from "react";
import api from "../../../../api";

const ViewClassroom = () => {
  const [classrooms, setClassrooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("rooms/");
      setClassrooms(response.data);
    };
    fetchData();
  }, []);

  
  return (
    <div className="h-screen w-screen bg-whit">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <ClassroomTable
            classrooms={classrooms}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewClassroom;
