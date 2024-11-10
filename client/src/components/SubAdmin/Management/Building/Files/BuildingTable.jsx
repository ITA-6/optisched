import React, { useState, useEffect } from "react";
import BuildingRow from "./BuildingRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const BuildingTable = ({ filteredBuildings, toggleDialog, openUpdate}) => {
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      // Simulate a delay for data loading (replace with actual data fetching)
      setTimeout(() => {
        setLoading(false); // Data is loaded
      }, 2000);
    };

    fetchData();
  }, []); // Run only once on component mount

  const rowsToDisplay = Array.from({ length: filteredBuildings.length }, (_, index) => {
    return (
      filteredBuildings[index] || { name: "", total_rooms: "", available_rooms: "" }
    );
  });

  if (loading) {
    // Show the loading video when data is being loaded
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[30vh] w-[30vw]" />
      </div>
    );
  }

  // Show the table when loading is complete
  return (
    <table className="h-[100%] w-full table-fixed bg-white text-center">
      <thead className="sticky -top-0.5 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            Building Name
          </th>
          <th scope="col" className="border border-white">
            Total Rooms
          </th>
          <th scope="col" className="border border-white">
            Available Rooms
          </th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay.map((filteredBuildings, index) => (
          <BuildingRow
            key={index}
            filteredBuildings={filteredBuildings}
            toggleDialog={toggleDialog}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BuildingTable;
