import React, { useEffect, useState } from "react";
import GeneratePrint from "./Files/GeneratePrint";
import GenerateTable from "./Files/GenerateTable";
import { useSidebar } from "../Sidenav/SidenavContext/SidenavContext";
import api from "../../../api";

const Generated = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const schedules = [];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("schedule/professor/");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} lg:mr-[2rem]ease-out grid grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_8fr] pb-10 duration-200 grid-areas-generated-table-layout sm:mr-0 xm:mr-0`}
      >
        <GeneratePrint />
        <div className="bg-white px-5 pt-5 grid-in-table">
          <div className="grid grid-cols-[1fr-1fr] grid-rows-[0.5fr_0.5fr_0.5fr_8fr_1fr] grid-areas-generated-table xm:mt-5">
            {data?.map((sched) => (
              <>
                <h1 className="text-base font-bold grid-in-profName sm:text-sm md:text-base xm:text-xs">
                  Professor name : {sched.professor.first_name}{" "}
                  {sched.professor.last_name}
                </h1>
                <h1 className="text-base font-bold grid-in-departmentName sm:text-sm md:text-base xm:text-xs">
                  Department : {sched.professor.department_name}
                </h1>
                <div className="flex items-center justify-between py-2 grid-in-units">
                  <h1 className="text-xl font-medium sm:text-sm lg:text-lg xm:text-xs">
                    Total Units : {sched.total_units}
                  </h1>
                </div>
              </>
            ))}
            <div className="h-[500px] overflow-auto grid-in-table">
              {" "}
              {/* Set horizontal overflow here */}
              <GenerateTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generated;
