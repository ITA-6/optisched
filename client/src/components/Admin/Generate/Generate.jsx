import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { departments } from "./data";

const Generate = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("CSS");
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    setSelectedDepartment("CSS");
  }, []);

  const handleButtonClick = (department) => {
    setSelectedDepartment(department);
  };

  const handleRowClick = (name) => {
    navigate(`/admin/generated/${encodeURIComponent(name)}`); // Navigate to details page with the name
  };

  const filteredData = departments.filter(
    (item) => item.department === selectedDepartment,
  );

  return (
    <div className="h-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] h-full">
        <div className="grid">
          <div className="text-md mt-20 flex gap-x-1 font-bold">
            {/* Button elements */}
            {["CSS", "COE", "CBAA", "COED", "CHAS", "CAS"].map((department) => (
              <button
                key={department}
                className={`h-10 w-20 flex-1 rounded-t-lg ${
                  selectedDepartment === department
                    ? "bg-gray-700"
                    : "bg-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => handleButtonClick(department)}
              >
                {department}
              </button>
            ))}
          </div>
        </div>
        <table className="h-3/4 w-full table-auto bg-white text-center">
          <thead className="bg-green-500 text-white">
            <tr className="h-12">
              <th scope="col">Professor Name</th>
              <th scope="col">Department</th>
              <th scope="col">Appointment Status</th>
            </tr>
          </thead>
          <tbody className="mb-10 h-full overflow-auto">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="h-20 cursor-pointer"
                  onClick={() => handleRowClick(item.name)}
                >
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.appointment}</td>
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

export default Generate;
