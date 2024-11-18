import React, { useState, useEffect } from "react";
import ProgramRow from "./ProgramRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ProgramTable = ({filteredPrograms}) => {
  const [loading, setLoading] = useState(true); // Manage loading state

  // Simulate data fetching or replace with actual fetching logic
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true
      // Simulate a delay or use actual API call for data fetching
      setTimeout(() => {
        setLoading(false); // Set loading to false when done
      }, 2000);
    };

    fetchData();
  }, []); // Run only once when the component mounts

  const rowsToDisplay = Array.from({ length: filteredPrograms.length}, (_, index) => {
    return filteredPrograms[index] || { name: "", department_name: "" };
  });

  if (loading) {
    // Show the loading video when data is being fetched
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[35vh] w-[35vw]" />
      </div>
    );
  }

  // Render the table when data is available
  return (
    <table className="h-[100%] w-full table-fixed bg-white text-center">
      <thead className="sticky top-0 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            Program Name
          </th>
          <th scope="col" className="border border-white">
            Acronym
          </th>
          <th scope="col" className="border border-white">
            Department
          </th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay?.map((filteredPrograms, index) => (
          <ProgramRow key={index} filteredPrograms={filteredPrograms} />
        ))}
      </tbody>
    </table>
  );
};

export default ProgramTable;
