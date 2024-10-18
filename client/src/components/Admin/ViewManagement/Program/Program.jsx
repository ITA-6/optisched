import { useEffect, useState } from "react";;
import SearchField from "./Files/SearchField";
import ProgramTable from "./Files/ProgramTable";
import api from "../../../../api";

const ViewProgram = () => {
  const [programs, setPrograms] = useState([]);
  const totalRows = (programs.length < 10) ? 10 : programs.length;
  useEffect(() => {
    const fetchData = async () => {
      const response = await api("programs/");
      setPrograms(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
      <SearchField />
      <div className={`mr-5 h-full grid-in-userTable ${(programs.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <ProgramTable
            programs={programs}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewProgram;
