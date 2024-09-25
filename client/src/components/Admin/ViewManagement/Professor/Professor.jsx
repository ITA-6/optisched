import { useEffect, useState } from "react";
import api from "../../../../api";
import SearchField from "./Files/SearchField";
import ProfessorTable from "./Files/ProfessorTables";

const ViewProfessor = () => {
  const [professors, setProfessor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("professors/");
      setProfessor(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <ProfessorTable
            professors={professors}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewProfessor;
