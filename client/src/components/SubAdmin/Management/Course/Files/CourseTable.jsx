import React, { useState, useEffect } from "react";
import CourseRow from "./CourseRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const CourseTable = ({
  toggleDialog,
  filteredCourses,
  openUpdate,
  totalRows,
}) => {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setTimeout(() => {
        setLoading(false); // Simulate data loading completion
      }, 2000);
    };

    fetchData();
  }, []); // Run only once on mount

  const rowsToDisplay = Array.from(
    { length: filteredCourses.length },
    (_, index) => {
      return filteredCourses[index] || { name: "", code: "", category: "" };
    },
  );

  if (loading) {
    // Show loading video while loading
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[30vh] w-[30vw]" />
      </div>
    );
  }

  return (
    <table className="w-full table-auto bg-white text-center">
      <thead className="sticky top-0 mb-10 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            Course Title
          </th>
          <th scope="col" className="border border-white">
            Course Code
          </th>
          <th scope="col" className="border border-white">
            Course type
          </th>
          <th scope="col" className="border border-white">
            Lec Unit
          </th>
          <th scope="col" className="border border-white">
            Lecture Hours
          </th>
          <th scope="col" className="border border-white">
            Lab Unit
          </th>
          <th scope="col" className="border border-white">
            Lab Hours
          </th>
          <th scope="col" className="border border-white">
            Total Units
          </th>
          <th scope="col" className="border border-white">
            Total Hours
          </th>
          <th scope="col" className="border border-white">
            Pre/Co-Requisite
          </th>
          <th scope="col" className="border border-white">
            Masteral
          </th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay.map((filteredCourses, index) => (
          <CourseRow
            key={index}
            filteredCourses={filteredCourses}
            toggleDialog={toggleDialog}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
