import React from "react";
import DashboardRow from "./DashboardRow";

const DashboardTable = () => {
  const data = [
    {
      name: "John Doe",
      lastSeen: "2024-10-09",
      firstSeen: "2023-03-01",
      department: "CCS",
      count: "5",
      lastSession: "2024-10-09",
    },
    {
      name: "Jane Smith",
      lastSeen: "2024-10-08",
      firstSeen: "2023-02-10",
      department: "COE",
      count: "4",
      lastSession: "2024-10-08",
    },
    {
      name: "Alice Johnson",
      lastSeen: "2024-10-09",
      firstSeen: "2023-01-05",
      department: "CBAA",
      count: "3",
      lastSession: "2024-10-09",
    },
    {
      name: "Michael Brown",
      lastSeen: "2024-10-07",
      firstSeen: "2023-05-12",
      department: "COED",
      count: "6",
      lastSession: "2024-10-07",
    },
    {
      name: "Emily Davis",
      lastSeen: "2024-10-06",
      firstSeen: "2023-04-15",
      department: "CHAS",
      count: "8",
      lastSession: "2024-10-06",
    },
    {
      name: "David Wilson",
      lastSeen: "2024-10-05",
      firstSeen: "2023-06-20",
      department: "CAS",
      count: "2",
      lastSession: "2024-10-05",
    },
    {
      name: "Sarah Taylor",
      lastSeen: "2024-10-04",
      firstSeen: "2023-07-25",
      department: "CCS",
      count: "7",
      lastSession: "2024-10-04",
    },
    {
      name: "James Anderson",
      lastSeen: "2024-10-03",
      firstSeen: "2023-08-30",
      department: "COE",
      count: "3",
      lastSession: "2024-10-03",
    },
    {
      name: "Sophia Martinez",
      lastSeen: "2024-10-02",
      firstSeen: "2023-09-05",
      department: "CBAA",
      count: "5",
      lastSession: "2024-10-02",
    },
    {
      name: "Daniel Lee",
      lastSeen: "2024-10-01",
      firstSeen: "2023-10-10",
      department: "COED",
      count: "9",
      lastSession: "2024-10-01",
    },
  ];

  return (
    <div className="grid h-full grid-cols-[1fr_8fr_1fr] text-center grid-areas-table grid-in-history">
      <table className="mb-16 table-fixed bg-white grid-in-table">
        <thead className="border-separate border border-gray-100 bg-green text-xs text-white">
          <tr>
            <th scope="col" className="border border-white p-2">
              Name
            </th>
            <th scope="col" className="border border-white">
              Last Seen
            </th>
            <th scope="col" className="border border-white">
              First Seen
            </th>
            <th scope="col" className="border border-white">
              Department
            </th>
            <th scope="col" className="border border-white">
              Count of Sessions
            </th>
            <th scope="col" className="border border-white">
              Last Session
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((row, index) => (
            <DashboardRow key={index} data={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
