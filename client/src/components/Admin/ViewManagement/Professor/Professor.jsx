import { useEffect, useState } from "react";
import api from "../../../../api";
import SearchField from "./Files/SearchField";
import ProfessorTable from "./Files/ProfessorTables";
import ProfessorViewModal from "./Files/ProfessorViewModal";
import {useSidebar} from "../../../Users/Sidenav/SidenavContext/SidenavContext"

const ViewProfessor = () => {
  const [professors, setProfessor] = useState([]);
  const totalRows = (professors.length < 10) ? 10 : professors.length;
  const [isViewProfessorOpen, setIsViewProfessorOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState([]);
  const {isSidebarOpen} = useSidebar();

  const [filtered, setFiltered] = useState("");

  const dynamicFiltered = professors.filter(
    (professor) => filtered === "" || professor.employment_status === filtered
  );

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("professors/");
      setProfessor(response.data);
    };
    fetchData();
  }, []);

  const ViewProfessor = (prof) => {
    const getProfessor =professors.filter((professor) => professor.prof_id === prof)

    if(getProfessor.length === 0) return;
    toggleViewProfessor();
    setSelectedProf(getProfessor);
  }

  const toggleViewProfessor = () =>{
    setIsViewProfessorOpen(!isViewProfessorOpen)
  }

  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]": "lg:ml-32"} ease-linear duration-200`}>
        <SearchField setFiltered={setFiltered} />
        <div className={`sm:ml-10 lg:ml-0 sm:mr-3 mr-5 h-full grid-in-userTable ${(professors.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <ProfessorTable
            dynamicFiltered={dynamicFiltered}
            totalRows={totalRows}
            ViewProfessor={ViewProfessor}
          />
        </div>
        {isViewProfessorOpen && (
          <ProfessorViewModal
          selectedProf={selectedProf}
          toggleViewProfessor={toggleViewProfessor}
          />
        )}
      </div>
    </div>
  );
};
export default ViewProfessor;
