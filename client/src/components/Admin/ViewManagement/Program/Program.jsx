import { useEffect, useState } from "react";;
import SearchField from "./Files/SearchField";
import ProgramTable from "./Files/ProgramTable";
import api from "../../../../api";

const ViewProgram = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api("programs/");
      setPrograms(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <ProgramTable
            programs={programs}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewProgram;
