import React, { useState, useEffect } from "react";
import SectionRow from "./SectionRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const SectionTable = ({filteredSections }) => {
  const [loading, setLoading] = useState(true); // State to manage loading status

  //  data loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      // Loading a delay for data loading (replace with actual data fetching)
      setTimeout(() => {
        setLoading(false); // Data is loaded
      }, 2000);
    };

    fetchData();
  }, []); // Run only once on component mount

  const rowsToDisplay = Array.from({ length:filteredSections.length }, (_, index) => {
    return filteredSections [index] || { label: "", year_level: "" };
  });

  if (loading) {
    // Show the loading video while data is being loaded
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[35vh] w-[35vw]" />
      </div>
    );
  }

  // Show the table when loading is complete
  return (
    <table className="h-[100%] w-full table-fixed bg-white text-center">
      <thead className="sticky top-0 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            Label
          </th>
          <th scope="col" className="border border-white">
            Year Level
          </th>
          <th scope="col" className="border border-white">
            College
          </th>
          <th scope="col" className="border border-white">
            Program
          </th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay.map((filteredSections , index) => (
          <SectionRow key={index} filteredSections ={filteredSections } />
        ))}
      </tbody>
    </table>
  );
};

export default SectionTable;
