import add from "../../../../assets/add.png";
import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import SectionTable from "./Files/SectionTable";


import api from "../../../../api";

const ViewSection = () => {
  const [sections, setSections] = useState([]);
  const totalRows = (sections.length < 10) ? 10 : sections.length;
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("sections/");
      setSections(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(sections.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <SectionTable
            sections={sections}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewSection;
