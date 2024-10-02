import React from "react";
import GeneratePrint from "./Files/GeneratePrint";
import GenerateTable from "./Files/GenerateTable";

const Generated = () => {

  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_8fr] pb-10 grid-areas-generated-table-layout">
        <GeneratePrint />
        <div className="h-full bg-white px-5 pt-5 grid-in-table">
          <div className="grid grid-cols-[1fr-1fr] grid-rows-[0.5fr_0.5fr_0.5fr_8fr_1fr] grid-areas-generated-table">
            <h1 className="text-base font-bold grid-in-profName">
              Professor name : 
            </h1>
            <h1 className="text-base font-bold grid-in-departmentName">
              Department : 
            </h1>
            <h1 className="text-base font-bold grid-in-appointmentStatus">
              Appointment Status : 
            </h1>

            <div className="h-full w-full flex-1 grid-in-table">
              <GenerateTable />
            </div>
            <div className="flex items-center justify-between py-2 grid-in-units">
              <h1 className="text-xl font-medium">Total Units :</h1>
              <button className="text-white rounded-lg bg-green px-10 py-3">
                {" "}
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generated;