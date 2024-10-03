import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({ departments, totalRows }) => {
 
  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return departments[index] || { name: '', acronym: '' };
  });

  return (
    <table className="w-full h-[100%] table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky top-0">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">College Name</th>
          <th scope="col" className="border border-white">College Code</th>
        </tr>
      </thead>
      <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
        {rowsToDisplay.map((department, index) => (
          <DepartmentRow key={index} department={department} />
        ))}
      </tbody>
    </table>
  );
};


export default DepartmentTable;
