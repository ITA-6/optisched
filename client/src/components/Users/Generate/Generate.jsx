import React from "react";
import GeneratePrint from "./Files/GeneratePrint";
import GenerateTable from "./Files/GenerateTable";
import { useSidebar } from "../Sidenav/SidenavContext/SidenavContext";
const Generated = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const schedules = []
  return (
    <div className="bg-gray-50 h-screen">
      <div className={`h-full ${isSidebarOpen ? "xl:ml-[18rem]" : "ml-0"} mr-[2rem] grid grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_8fr] pb-10 grid-areas-generated-table-layout`}>
        <GeneratePrint />
        <div className="bg-white px-5 pt-5 grid-in-table">
          <div className="grid grid-cols-[1fr-1fr] grid-rows-[0.5fr_0.5fr_0.5fr_8fr_1fr] grid-areas-generated-table">
            <h1 className="text-base font-bold grid-in-profName">
              Professor name : Miro Dela Cruz
            </h1>
            <h1 className="text-base font-bold grid-in-departmentName">
              Department :  CCS
            </h1>

            <div className="h-full w-full flex-1 grid-in-table">
              <GenerateTable  schedules={schedules}/>
            </div>
            <div className="flex items-center justify-between py-2 grid-in-units">
              <h1 className="text-xl font-medium">Total Units : 18</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generated;