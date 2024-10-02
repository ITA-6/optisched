import React from 'react';
import DashboardRow from './DashboardRow';

const DashboardTable = () => {
  const data = [
    { name: 'John Doe', lastSeen: 'Mathematics', firstSeen: '22', department: 'Grade 10', count: '5', lastSession: '2023-09-20' },
    { name: 'Jane Smith', lastSeen: 'Biology', firstSeen: '45', department: 'Grade 11', count: '4', lastSession: '2023-09-22' },
    { name: 'Alice Johnson', lastSeen: 'Chemistry', firstSeen: '29', department: 'Grade 12', count: '3', lastSession: '2023-09-25' },
    { name: 'Michael Brown', lastSeen: 'Physics', firstSeen: '30', department: 'Grade 10', count: '6', lastSession: '2023-09-21' },
    { name: 'Emily Davis', lastSeen: 'History', firstSeen: '15', department: 'Grade 11', count: '8', lastSession: '2023-09-23' },
    { name: 'David Wilson', lastSeen: 'Literature', firstSeen: '28', department: 'Grade 12', count: '2', lastSession: '2023-09-24' },
    { name: 'Sarah Taylor', lastSeen: 'Mathematics', firstSeen: '10', department: 'Grade 10', count: '7', lastSession: '2023-09-19' },
    { name: 'James Anderson', lastSeen: 'Biology', firstSeen: '35', department: 'Grade 11', count: '3', lastSession: '2023-09-26' },
    { name: 'Sophia Martinez', lastSeen: 'Chemistry', firstSeen: '20', department: 'Grade 12', count: '5', lastSession: '2023-09-27' },
    { name: 'Daniel Lee', lastSeen: 'Physics', firstSeen: '33', department: 'Grade 10', count: '9', lastSession: '2023-09-28' },
  ];

  
  return (
    <div className="grid h-full grid-cols-[1fr_8fr_1fr] text-center grid-areas-table grid-in-history">
      <table className="mb-16 table-fixed bg-white grid-in-table">
        <thead className="bg-green border-separate border border-gray-100 text-xs text-white">
          <tr>
            <th scope="col" className="border border-white p-2">Name</th>
            <th scope="col" className="border border-white">Last Seen</th>
            <th scope="col" className="border border-white">First Seen</th>
            <th scope="col" className="border border-white">Department</th>
            <th scope="col" className="border border-white">Count of Sessions</th>
            <th scope="col" className="border border-white">Last Session</th>
          </tr>
        </thead>
        <tbody  className='text-sm'>
          {data.map((row, index) => (
            <DashboardRow key={index} data={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;