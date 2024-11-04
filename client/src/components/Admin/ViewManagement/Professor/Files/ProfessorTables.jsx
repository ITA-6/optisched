import React, { useState, useEffect } from "react";
import ProfessorRow from "./ProfessorRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ProfessorTables = ({ dynamicFiltered , totalRows = 10, ViewProfessor }) => {
  const [loading, setLoading] = useState(true); // State to manage loading status

  // data loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      // loading a delay for data loading (replace with actual data fetching)
      setTimeout(() => {
        setLoading(false); // Data is loaded
      }, 2000);
    };

    fetchData();
  }, []); // Run only once on component mount

  const rowsToDisplay = Array.from({ length: dynamicFiltered.length }, (_, index) => {
    return (
      dynamicFiltered[index] || {
        prof_id: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        email: "",
        department_name: "",
        has_masteral: "",
        employment_status: "",
      }
    );
  });

  if (loading) {
    // Show the loading video when data is being loaded
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[35vh] w-[35vw]" />
      </div>
    );
  }

  // Show the table when loading is complete
  return (
    <table className="h-full w-full table-fixed bg-white text-center">
      <thead className="sticky top-0 border-separate border border-white bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="h-[30px] w-[100px]">
            ID
          </th>
          <th scope="col" className="h-[30px] w-[150px]">
            Name
          </th>
          <th scope="col" className="h-[30px] w-[150px]">
            Birthdate
          </th>
          <th scope="col" className="h-[30px] w-[200px]">
            Email Address
          </th>
          <th scope="col" className="h-[30px] w-[150px]">
            Department
          </th>
          <th scope="col" className="h-[30px] w-[100px]">
            Masteral
          </th>
          <th scope="col" className="h-[30px] w-[150px]">
            Employment Status
          </th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
        {rowsToDisplay.map((dynamicFiltered, index) => (
          <ProfessorRow key={index} dynamicFiltered={dynamicFiltered} ViewProfessor={ViewProfessor} />
        ))}
      </tbody>
    </table>
  );
};

export default ProfessorTables;
