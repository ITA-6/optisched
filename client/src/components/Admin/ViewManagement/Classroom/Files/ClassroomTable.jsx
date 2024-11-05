import React, { useState, useEffect } from "react";
import ClassroomRow from "./ClassroomRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ClassroomTable = ({classroom}) => {
  const [loading, setLoading] = useState(true); // Manage loading state

  // Simulate data loading
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

  const rowsToDisplay = Array.from({ length: classroom.length }, (_, index) => {
    return classroom[index] || { number: "", floor: "", building: "" };
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
          <th scope="col">Building Name</th>
          <th scope="col">Room Number</th>
          <th scope="col">Floor Number</th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto">
        {rowsToDisplay?.map((classroom, index) => (
          <ClassroomRow key={index} classroom={classroom} />
        ))}
      </tbody>
    </table>
  );
};

export default ClassroomTable;
