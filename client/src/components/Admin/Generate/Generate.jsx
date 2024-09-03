import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { departments } from './data';

const Generate = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('CSS');
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    setSelectedDepartment('CSS');
  }, []);

  const handleButtonClick = (department) => {
    setSelectedDepartment(department);
  };

  const handleRowClick = (name) => {
    navigate(`/admin/generated/${encodeURIComponent(name)}`); // Navigate to details page with the name
  };

  const filteredData = departments.filter(item => item.department === selectedDepartment);

  return (
    <div className="h-screen bg-white-grayish">
      <div className="h-full ml-[18rem] mr-[2rem]">
        <div className="grid">
          <div className="flex mt-20 gap-x-1 font-bold text-md ">
            {/* Button elements */}
            <button className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20" onClick={() => handleButtonClick('CSS')}>CSS</button>
            <button className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20" onClick={() => handleButtonClick('COE')}>COE</button>
            <button className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20" onClick={() => handleButtonClick('CBAA')}>CBAA</button>
            <button className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20" onClick={() => handleButtonClick('COED')}>COED</button>
            <button className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20" onClick={() => handleButtonClick('CHAS')}>CHAS</button>
            <button className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20" onClick={() => handleButtonClick('CAS')}>CAS</button>
          </div>
        </div>
        <table className="w-full h-3/4 table-auto bg-white text-center">
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
                <tr key={index} className="h-20 cursor-pointer" onClick={() => handleRowClick(item.name)}>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.appointment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Generate;