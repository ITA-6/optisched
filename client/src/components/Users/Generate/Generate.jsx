import React from "react";
import GeneratePrint from "./Files/GeneratePrint";
import GenerateTable from "./Files/GenerateTable";
import { useSidebar } from "../Sidenav/SidenavContext/SidenavContext";
const Generated = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const schedules = []
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className={`h-full ${isSidebarOpen ? " xl:ml-[18rem]" : "lg:ml-32"} grid grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_8fr] pb-10 grid-areas-generated-table-layout xm:mr-0 sm:mr-0 lg:mr-[2rem]ease-out duration-200`}>
        <GeneratePrint />
        <div className="bg-white px-5 pt-5 grid-in-table">
          <div className="grid grid-cols-[1fr-1fr] grid-rows-[0.5fr_0.5fr_0.5fr_8fr_1fr] grid-areas-generated-table xm:mt-5">
            <h1 className="text-base font-bold grid-in-profName xm:text-xs sm:text-sm md:text-base">
              Professor name : Miro Dela Cruz
            </h1>
            <h1 className="text-base font-bold grid-in-departmentName xm:text-xs sm:text-sm md:text-base">
              Department :  CCS
            </h1>

            <div className="h-full w-full flex-1 grid-in-table overflow-auto">
              <GenerateTable  schedules={schedules}/>
            </div>
            <div className="flex items-center justify-between py-2 grid-in-units">
              <h1 className="text-xl font-medium xm:text-xs sm:text-sm lg:text-lg">Total Units : 18</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generated;