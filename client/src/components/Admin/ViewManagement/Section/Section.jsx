import add from "../../../../assets/add.png";
import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import SectionTable from "./Files/SectionTable";
import {useSidebar} from "../../../Users/Sidenav/SidenavContext/SidenavContext"

import api from "../../../../api";

const ViewSection = () => {
  const [sections, setSections] = useState([]);
  const totalRows = (sections.length < 10) ? 10 : sections.length;
  const {isSidebarOpen} = useSidebar();

  const [selectedStatus, setSelectedStatus] = useState(''); // New state for the select option
  const [searchItem, setSearchItem] = useState('');
  const [filteredSections, setFilteredSections] = useState(sections);

  useEffect(() => {
      setFilteredSections(sections);
  }, [sections]);

  const handleInputChange = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      setSearchItem(searchTerm);
      filterSections(searchTerm, selectedStatus);
  };

  const handleStatusChange = (e) => {
      const status = e.target.value;
      setSelectedStatus(status);
      filterSections(searchItem, status);
  };

  const filterSections = (searchTerm, status) => {
      const filteredItems = sections.filter((section) => {
          // Check if the section's label matches the selected status, if any
          const matchesStatus = status ? section.label === status : true;
          
          // Check if any of the specific fields match the search term
          const matchesSearchTerm = 
              (section.label && section.label.toLowerCase().startsWith(searchTerm)) ||
              (section.year_level && section.year_level.toString().startsWith(searchTerm)) ||
              (section.department_name && section.department_name.toLowerCase().startsWith(searchTerm)) ||
              (section.program_name && section.program_name.toLowerCase().startsWith(searchTerm));

          // Return true if both conditions match
          return matchesStatus && matchesSearchTerm;
      });

      setFilteredSections(filteredItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("sections/");
      setSections(response.data);
    };
    fetchData();
  }, []);

  const getAllSection = [
    ...new Set(sections.map((section) => section.label)),
  ];
  
  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]": "lg:ml-32"} ease-linear duration-200`}>
        <SearchField getAllSection={getAllSection}  handleInputChange={handleInputChange} handleStatusChange={handleStatusChange} />
        <div className={`sm:ml-10 lg:ml-0 sm:mr-3 mr-5 h-full grid-in-userTable ${(filteredSections.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <SectionTable
            filteredSections ={filteredSections}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewSection;
