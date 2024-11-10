import React, { useState, useEffect } from "react";
import CourseRow from "./CourseRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const CourseTable = ({filteredCourses}) => {
  const [loading, setLoading] = useState(true); // Manage loading state

  // Simulate data loading or replace with actual data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      // Simulate a delay for data loading (replace with actual data fetching)
      setTimeout(() => {
        setLoading(false); // Data is loaded
      }, 2000);
    };

    fetchData();
  }, []); // Run only once when the component mounts

  const rowsToDisplay = Array.from({ length: filteredCourses.length }, (_, index) => {
    return filteredCourses[index] || { name: "", code: "", category: "" };
  });

  if (loading) {
    // Show the loading video while data is being loaded
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[35vh] w-[35vw]" />
      </div>
    );
  }

  // Display the table when data is loaded
  return (
    <table className="h-[100%] w-full table-fixed bg-white text-center">
      <thead className="sticky top-0 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            Course Title
          </th>
          <th scope="col" className="border border-white">
            Course Code
          </th>
          <th scope="col" className="border border-white">
            Course Type
          </th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay?.map((filteredCourses, index) => (
          <CourseRow key={index} filteredCourses={filteredCourses} />
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
