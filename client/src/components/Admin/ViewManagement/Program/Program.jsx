import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import ProgramTable from "./Files/ProgramTable";
import api from "../../../../api";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";

const ViewProgram = () => {
  const [programs, setPrograms] = useState([]);
  const { isSidebarOpen } = useSidebar();
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    // Set initial filtered programs when component mounts or programs change
    setFilteredPrograms(programs);
  }, [programs]);

  // Get all unique department names for the dropdown
  const allDepartments = [
    ...new Set(programs.map((program) => program.department_name)),
  ];

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterPrograms(searchTerm, selectedDepartment);
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    filterPrograms(searchTerm, department);
  };

  const filterPrograms = (searchTerm, department) => {
    const filteredItems = programs.filter((program) => {
      // Check if program's department matches the selected department, or if no department is selected
      const matchesDepartment =
        department === "" || program.department_name === department;

      // Check if any relevant field in program data starts with the search term
      const matchesSearchTerm =
        program.name.toLowerCase().startsWith(searchTerm) ||
        program.department_name.toLowerCase().startsWith(searchTerm);

      // Return true if both conditions match
      return matchesDepartment && matchesSearchTerm;
    });

    setFilteredPrograms(filteredItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api("programs/");
      setPrograms(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div
        className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        <SearchField
          allDepartments={allDepartments}
          handleInputChange={handleInputChange}
          handleDepartmentChange={handleDepartmentChange}
        />
        <div
          className={`mr-5 grid-in-userTable sm:ml-10 sm:mr-3 lg:ml-0 ${filteredPrograms.length > 10 ? "overflow-y-scroll" : "overflow-hidden"} relative`}
        >
          <ProgramTable filteredPrograms={filteredPrograms} />
        </div>
      </div>
    </div>
  );
};
export default ViewProgram;
