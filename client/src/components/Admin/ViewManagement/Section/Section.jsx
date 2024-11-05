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
  
  const [filtered, setFiltered] = useState("");

  const section = sections.filter(
    (section) => filtered === "" || section.label === filtered
  );
  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]": "lg:ml-32"} ease-linear duration-200`}>
        <SearchField getAllSection={getAllSection}  setFiltered={setFiltered} />
        <div className={`mr-5 h-full grid-in-userTable ${(sections.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <SectionTable
            section ={section}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewSection;
