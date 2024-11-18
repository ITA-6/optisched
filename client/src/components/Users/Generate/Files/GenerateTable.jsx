import React from "react";
import GenerateTableRow from "./GenerateTableRow";

const GenerateTable = ({ data }) => {
  return (
    <table className="min-w-full sm:table-fixed lg:table-auto xm:table-fixed">
      <thead className="bg-green">
        <tr className="text-white sm:text-[0.7em] xm:text-[0.6em]">
          <th className="p-1 sm:w-32 xm:w-20">Course Code</th>
          <th className="sm:w-44 xm:w-44">Course Description</th>
          <th className="sm:w-20 xm:w-20">Lec Units</th>
          <th className="sm:w-20 xm:w-20">Lab Units</th>
          <th className="sm:w-44 xm:w-44">Day</th>
          <th className="sm:w-44 xm:w-44">Time</th>
          <th className="sm:w-20 xm:w-20">Room</th>
          <th className="sm:w-20 xm:w-20">Section</th>
        </tr>
      </thead>
      <tbody className="text-center sm:text-sm xm:text-xs  className='border border-collapse border-gray-300'">
        {data.map((sched) =>
          sched.courses.map((course, index) => (
            <GenerateTableRow course={course} key={index} sched={sched} />
          )),
        )}
      </tbody>
    </table>
  );
};

export default GenerateTable;
