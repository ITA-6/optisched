import React, { useState, useEffect } from "react";
import ClassroomRow from "./ClassroomRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ClassroomTable = ({
  toggleDialog,
  classrooms,
  openUpdate,
  totalRows,
}) => {
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while data is being fetched
      setTimeout(() => {
        setLoading(false); // Simulate data loading completion
      }, 2000); //
    };

    fetchData();
  }, []); // Run once on mount

  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return classrooms[index] || { building: "", number: "", floor: "" };
  });

  if (loading) {
    // Show the loading video while data is being loaded
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[30vh] w-[30vw]" />
      </div>
    );
  }

  return (
    <table className="h-[100%] w-full table-fixed bg-white text-center">
      <thead className="sticky -top-0.5 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            Building Name
          </th>
          <th scope="col" className="border border-white">
            Room Number
          </th>
          <th scope="col" className="border border-white">
            Floor Number
          </th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay.map((classroom, index) => (
          <ClassroomRow
            key={index}
            toggleDialog={toggleDialog}
            classroom={classroom}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ClassroomTable;
