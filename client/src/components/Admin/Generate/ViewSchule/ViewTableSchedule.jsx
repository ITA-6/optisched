import React from "react";
import ViewTableRow from "./ViewTableRow";
const ViewTableSchedule = ({ sectionArray }) => {
  return (
    <table className="mb-10 h-full w-full table-fixed lg:table-auto">
      <thead>
        <tr className="sm:text-sm md:text-sm">
          <th className="bg-green p-1 text-white sm:w-44 xm:w-44">
            Professor Name
          </th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Course Code</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">
            Course Description
          </th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Lec Units</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Lab Units</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Total Units</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Day</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Time</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Building</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Room</th>
          <th className="bg-green text-white sm:w-44 xm:w-44">Section</th>
        </tr>
      </thead>
      <tbody className="border-collapse border border-gray-300 sm:text-sm">
        {sectionArray.courses.map((course, index) => (
          <ViewTableRow
            course={course}
            key={index}
            sectionArray={sectionArray}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ViewTableSchedule;
