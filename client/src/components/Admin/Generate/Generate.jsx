import React, { useState,  useEffect } from 'react';


const departments = [
    // CSS Department
    { name: 'John Doe', department: 'CSS', appointment: 'approved' },
    { name: 'Jane Smith', department: 'CSS', appointment: 'rejected' },
    { name: 'Emily Davis', department: 'CSS', appointment: 'approved' },
    { name: 'Michael Brown', department: 'CSS', appointment: 'pending' },
    { name: 'Chris Wilson', department: 'CSS', appointment: 'pending' },
  
    // COE Department
    { name: 'Alice Johnson', department: 'COE', appointment: 'rejected' },
    { name: 'Bob Lee', department: 'COE', appointment: 'pending' },
    { name: 'Carol Martinez', department: 'COE', appointment: 'approved' },
    { name: 'David Anderson', department: 'COE', appointment: 'approved' },
    { name: 'Ella Thomas', department: 'COE', appointment: 'pending' },
  
    // COED Department
    { name: 'Fiona Brown', department: 'COED', appointment: 'approved' },
    { name: 'George Wilson', department: 'COED', appointment: 'approved' },
    { name: 'Hannah Clark', department: 'COED', appointment: 'approved' },
    { name: 'Ian Lewis', department: 'COED', appointment: 'pending' },
    { name: 'Julia Walker', department: 'COED', appointment: 'pending' },
  
    // CBAA Department
    { name: 'Kevin Scott', department: 'CBAA', appointment: 'rejected' },
    { name: 'Laura Young', department: 'CBAA', appointment: 'rejected' },
    { name: 'Megan Adams', department: 'CBAA', appointment: 'pending' },
    { name: 'Nathan Hall', department: 'CBAA', appointment: 'approved' },
    { name: 'Olivia Green', department: 'CBAA', appointment: 'pending' },
  
    // CHAS Department
    { name: 'Paul Harris', department: 'CHAS', appointment: 'pending' },
    { name: 'Quinn Baker', department: 'CHAS', appointment: 'approved' },
    { name: 'Rachel Evans', department: 'CHAS', appointment: 'pending' },
    { name: 'Sam Walker', department: 'CHAS', appointment: 'pending' },
    { name: 'Tina Wright', department: 'CHAS', appointment: 'rejected' },
  
    // CAS Department
    { name: 'Ursula Robinson', department: 'CAS', appointment: 'rejected' },
    { name: 'Victor King', department: 'CAS', appointment: 'approved' },
    { name: 'Wendy Lee', department: 'CAS', appointment: 'pending' },
    { name: 'Xander Smith', department: 'CAS', appointment: 'pending' },
    { name: 'Yara Jones', department: 'CAS', appointment: 'rejected' }
  ];

const Generate = () =>{
      const [selectedDepartment, setSelectedDepartment] = useState('CSS');

      useEffect(() => {
        setSelectedDepartment('CSS');
      }, []);
    
      const handleButtonClick = (department) => {
        setSelectedDepartment(department);
      };
    
      const filteredData = departments.filter(item => item.department === selectedDepartment);

    return(
       <div className="h-screen bg-white-grayish">
            <div className="h-full ml-[18rem] mr-[2rem]">
                <div className="grid">
                    <div className="flex mt-20 gap-x-1 font-bold text-md ">
                    <button
                        className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20"
                        onClick={() => handleButtonClick('CSS')}
                        >
                        CSS
                        </button>
                        <button
                        className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20"
                        onClick={() => handleButtonClick('COE')}
                        >
                        COE
                        </button>
                        <button
                        className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20"
                        onClick={() => handleButtonClick('CBAA')}
                        >
                        CBAA
                        </button>
                        <button
                        className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20"
                        onClick={() => handleButtonClick('COED')}
                        >
                        COED
                        </button>
                        <button
                        className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20"
                        onClick={() => handleButtonClick('CHAS')}
                        >
                        CHAS
                        </button>
                        <button
                        className="bg-gray-300 flex-1 h-10 rounded-t-lg w-20"
                        onClick={() => handleButtonClick('CAS')}
                        >
                        CAS
                        </button>
                    </div>
                </div>
                <table class="w-full h-3/4 table-auto bg-white text-center grid-in-table">
                    <thead className="bg-green">
                        <tr class="h-[30px]">
                            <th scope="col">Professor Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Appoitment Status</th>
                        </tr>
                    </thead>
                    <tbody className="mb-10 h-full overflow-auto">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                            <tr key={index} className="h-20">
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
                <div className="grid justify-end items-center">
                    <p> PS : this button is just here to show the generated schedule table</p>
                    <div className="flex justify-end mr-5">
                        <button className="w-20 h-10 bg-green">Generate</button>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default Generate;