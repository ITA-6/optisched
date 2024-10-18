import React, { useState, useEffect } from "react";
import ProfessorRow from "./ProfessorRow";
import loadingVideo from "../../../../../assets/loadingVideo.mp4";

const ProfessorTables = ({
  toggleDialog,
  professors,
  openUpdate,
  totalRows,
}) => {
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate data fetching or any asynchronous operation
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setTimeout(() => {
        setLoading(false); // Simulate data load completion
      }, 2000);
    };

    fetchData();
  }, []); // Empty dependency array to run this effect only once on component mount

  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return (
      professors[index] || {
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
    // Show loading video while data is loading
    return (
      <div className="flex h-full items-center justify-center">
        <video src={loadingVideo} autoPlay loop className="h-[30vh] w-[30vw]" />
      </div>
    );
  }

  return (
    <>
      <table className="h-[100%] w-full table-auto bg-white text-center">
        <thead className="sticky -top-0.5 border-separate border border-white bg-green text-xs text-white">
          <tr className="h-[30px]">
            <th scope="col" className="  border border-white">
              ID
            </th>
            <th scope="col" className="   border border-white">
              Name
            </th>
            <th scope="col" className="   border border-white">
              Birthdate
            </th>
            <th scope="col" className="   border border-white">
              Email Address
            </th>
            <th scope="col" className="   border border-white">
              Department
            </th>
            <th scope="col" className=" ] border border-white">
              Masteral
            </th>
            <th scope="col" className="   border border-white">
              Employment Status
            </th>
            <th
              scope="col"
              className="   border border-white"
            ></th>
          </tr>
        </thead>
        <tbody className="mb-10 border-collapse border-y-2 border-gray-200 text-sm">
          {rowsToDisplay?.map((professor, index) => (
            <ProfessorRow
              key={index}
              toggleDialog={toggleDialog}
              professor={professor}
              openUpdate={openUpdate}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProfessorTables;
