import React, { useState, useEffect } from "react";
import SectionRow from "./SectionRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const SectionTable = ({ toggleDialog, filteredSections, openUpdate }) => {
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
    { length: filteredSections.length },
    (_, index) => {
      return filteredSections[index] || { label: "", year_level: "" };
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
            Label
          </th>
          <th scope="col" className="border border-white">
            Program
          </th>
          <th scope="col" className="border border-white">
            Department
          </th>
          <th scope="col" className="border border-white">
            Year Level
          </th>
          <th scope="col" className="border border-white">
            Adviser
          </th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay.map((filteredSections, index) => (
          <SectionRow
            key={index}
            toggleDialog={toggleDialog}
            filteredSections={filteredSections}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SectionTable;
