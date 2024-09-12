import React, { useState, useEffect } from "react";
import { programs } from "./curriculumData";

const Curriculum = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("CSS");

  useEffect(() => {
    setSelectedDepartment("CSS");
  }, []);

  const handleButtonClick = (department) => {
    setSelectedDepartment(department);
  };

  const filteredPrograms = programs.filter(
    (program) => program.department === selectedDepartment,
  );

  return (
    <div className="h-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] h-full">
        <div className="grid">
          <div className="text-md mt-20 flex gap-x-1 font-bold">
            {/* Button elements */}
            <button
              className="h-10 w-20 flex-1 rounded-t-lg bg-gray-300"
              onClick={() => handleButtonClick("CSS")}
            >
              CSS
            </button>
            <button
              className="h-10 w-20 flex-1 rounded-t-lg bg-gray-300"
              onClick={() => handleButtonClick("COE")}
            >
              COE
            </button>
            <button
              className="h-10 w-20 flex-1 rounded-t-lg bg-gray-300"
              onClick={() => handleButtonClick("CBAA")}
            >
              CBAA
            </button>
            <button
              className="h-10 w-20 flex-1 rounded-t-lg bg-gray-300"
              onClick={() => handleButtonClick("COED")}
            >
              COED
            </button>
            <button
              className="h-10 w-20 flex-1 rounded-t-lg bg-gray-300"
              onClick={() => handleButtonClick("CHAS")}
            >
              CHAS
            </button>
            <button
              className="h-10 w-20 flex-1 rounded-t-lg bg-gray-300"
              onClick={() => handleButtonClick("CAS")}
            >
              CAS
            </button>
          </div>
        </div>
        <table className="h-3/4 w-full table-auto bg-white text-center">
          <thead className="bg-green-500 text-white">
            <tr className="h-12">
              <th scope="col">Program</th>
            </tr>
          </thead>
          <tbody className="mb-10 h-full overflow-auto">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program, index) => (
                <tr key={index} className="h-20 cursor-pointer">
                  <td>{program.program}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Curriculum;
