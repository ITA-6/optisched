import { useEffect, useState } from "react";
import api from "../../../../api";
import SearchField from "./Files/SearchField";
import ProfessorTable from "./Files/ProfessorTables";
import ProfessorViewModal from "./Files/ProfessorViewModal";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";

const ViewProfessor = () => {
  const [professors, setProfessor] = useState([]);
  const totalRows = professors.length < 10 ? 10 : professors.length;
  const [isViewProfessorOpen, setIsViewProfessorOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState([]);
  const { isSidebarOpen } = useSidebar();

  const [selectedStatus, setSelectedStatus] = useState(""); // New state for the select option
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(professors);

  useEffect(() => {
    // Set initial filtered users when component mounts or professors change
    setFilteredUsers(professors);
  }, [professors]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchItem(searchTerm);
    filterUsers(searchTerm, selectedStatus);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    filterUsers(searchItem, status);
  };

  const filterUsers = (searchTerm, status) => {
    const filteredItems = professors.filter((prof) => {
      // Check if professor's employment status matches the selected status, if any
      const matchesStatus = status ? prof.employment_status === status : true;

      // Check if any field in professor's data starts with the search term
      const matchesSearchTerm = Object.values(prof).some(
        (value) =>
          value && value.toString().toLowerCase().startsWith(searchTerm),
      );

      // Return true if both conditions match
      return matchesStatus && matchesSearchTerm;
    });

    setFilteredUsers(filteredItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("professors/");
      setProfessor(response.data);
    };
    fetchData();
  }, []);

  const ViewProfessor = (prof) => {
    const getProfessor = professors.filter(
      (professor) => professor.prof_id === prof,
    );

    if (getProfessor.length === 0) return;
    toggleViewProfessor();
    setSelectedProf(getProfessor);
  };

  const toggleViewProfessor = () => {
    setIsViewProfessorOpen(!isViewProfessorOpen);
  };

  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div
        className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        <SearchField
          handleInputChange={handleInputChange}
          handleStatusChange={handleStatusChange}
        />
        <div
          className={`mr-5 grid-in-userTable sm:ml-10 sm:mr-3 lg:ml-0 ${professors.length > 10 ? "overflow-y-scroll" : "overflow-hidden"} relative`}
        >
          <ProfessorTable
            filteredUsers={filteredUsers}
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
