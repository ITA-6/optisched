import React, { useState, useEffect } from "react";
import ClassroomRow from "./ClassroomRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ClassroomTable = ({ filteredClassrooms }) => {
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

  const rowsToDisplay = Array.from(
    { length: filteredClassrooms.length },
    (_, index) => {
      return (
        filteredClassrooms[index] || { number: "", floor: "", building: "" }
      );
    },
  );

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
    <table className="w-full table-fixed bg-white text-center">
      <thead className="sticky top-0 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col">Building Name</th>
          <th scope="col">Room Number</th>
          <th scope="col">Floor Number</th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto">
        {filteredClassrooms.length > 0 ? (
          rowsToDisplay?.map((filteredClassrooms, index) => (
            <ClassroomRow key={index} filteredClassrooms={filteredClassrooms} />
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="3">
              No classrooms found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ClassroomTable;
