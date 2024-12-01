import React, { useState, useEffect } from "react";
import ProgramRow from "./ProgramRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ProgramTable = ({ toggleDialog, filteredPrograms, openUpdate }) => {
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate data fetching or any asynchronous operation
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setTimeout(() => {
        setLoading(false); // Simulate data load completion
      }, 2000); // Adjust delay as necessary
    };

    fetchData();
  }, []); // Empty dependency array to run this effect only once on component mount

  const rowsToDisplay = Array.from(
    { length: filteredPrograms.length },
    (_, index) => {
      return filteredPrograms[index] || { name: "", department_name: "" };
    },
  );

  if (loading) {
    // Show loading video while data is loading
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[30vh] w-[30vw]" />
      </div>
    );
  }

  return (
    <table className="w-full table-fixed bg-white text-center">
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
          <th className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay?.map((filteredPrograms, index) => (
          <ProgramRow
            key={index}
            toggleDialog={toggleDialog}
            filteredPrograms={filteredPrograms}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProgramTable;
