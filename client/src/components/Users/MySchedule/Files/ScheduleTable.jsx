import React, { useEffect, useState } from "react";
import ScheduleRow from "./ScheduleRow";
import api from "../../../../api";
import { format, addMinutes, isBefore } from "date-fns";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";

const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let current = new Date();
  current.setHours(startTime.split(":")[0], startTime.split(":")[1], 0, 0);
  const end = new Date();
  end.setHours(endTime.split(":")[0], endTime.split(":")[1], 0, 0);

  while (isBefore(current, end)) {
    const slotStart = format(current, "hh:mm a"); // Format to ensure leading zero
    const slotEnd = format(addMinutes(current, 30), "hh:mm a");
    slots.push({ start: slotStart, end: slotEnd });
    current = addMinutes(current, 30);
  }
  return slots;
};

const ScheduleTable = () => {
  const timeSlots = generateTimeSlots("6:00", "22:00");
  const [scheduleData, setScheduleData] = useState([]);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("schedule/professor/");
        setScheduleData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="w-[85%] w border-collapse border  table-fixed">
      <thead>
        <tr className="bg-green text-white lg:text-xs sm:text-[0.7rem] md:text-xs">
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200 p-2 sm:p-0 lg:p-2`}>
            TIME
          </th>
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200`}>MONDAY</th>
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200`}>TUESDAY</th>
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200`}>WEDNESDAY</th>
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200`}>THURSDAY</th>
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200`}>FRIDAY</th>
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200`}>SATURDAY</th>
          <th className={`border sm:w-40 xm:w-12 ${isSidebarOpen ? "md:w-[12.2rem]" : "lg:w-[9.2rem] xl:w-[13rem]"} xm:p-0 xm:text-[0.5rem] ease-out duration-200`}>SUNDAY</th>
        </tr>
      </thead>
      <tbody className="text-center text-xs">
        {timeSlots.map((timeslot, index) => (
          <ScheduleRow
            key={index}
            timeslot={timeslot}
            scheduleData={scheduleData}
          />
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-green text-white lg:text-xs sm:p-0 lg:p-2">
          <th className="border sm:w-40 p-2">TIME</th>
          <th className="border sm:w-40">MONDAY</th>
          <th className="border sm:w-40">TUESDAY</th>
          <th className="border sm:w-40">WEDNESDAY</th>
          <th className="border sm:w-40">THURSDAY</th>
          <th className="border sm:w-40">FRIDAY</th>
          <th className="border sm:w-40">SATURDAY</th>
          <th className="border sm:w-40">SUNDAY</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default ScheduleTable;
