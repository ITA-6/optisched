import React, { useState, useEffect } from "react";
import DepartmentRow from "./DepartmentRow";
import loadingVideo from "../../../../assets/loadingVideo.mp4";

const DepartmentTable = ({
  departments,
  toggleDialog,
  openUpdate,
  totalRows,
}) => {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setTimeout(() => {
        setLoading(false); // Simulate data loading completion
      }, 2000);
    };

    fetchData();
  }, []); // Runs once on component mount

  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return departments[index] || { name: "", acronym: "" };
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
    <table className="w-full table-fixed bg-white text-center">
      <thead className="sticky top-0 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">
            College Name
          </th>
          <th scope="col" className="border border-white">
            College Code
          </th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full border-collapse overflow-auto border border-gray-100">
        {rowsToDisplay.map((department, index) => (
          <DepartmentRow
            key={index}
            toggleDialog={toggleDialog}
            department={department}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
