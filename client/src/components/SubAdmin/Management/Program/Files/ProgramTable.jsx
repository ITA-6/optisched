import React, { useState, useEffect } from "react";
import ProgramRow from "./ProgramRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ProgramTable = ({ toggleDialog, programs, openUpdate, totalRows }) => {
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

  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return programs[index] || { name: "", department_name: "" };
  });

  if (loading) {
    // Show loading video while data is loading
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[30vh] w-[30vw]" />
      </div>
    );
  }

  return (
    <table className="h-[100%] w-full table-fixed bg-white text-center">
      <thead className="sticky top-0 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            Program Name
          </th>
          <th scope="col" className="border border-white">
            Department
          </th>
          <th className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay?.map((program, index) => (
          <ProgramRow
            key={index}
            toggleDialog={toggleDialog}
            program={program}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProgramTable;
