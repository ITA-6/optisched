import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({ departments }) => {
  const totalRows = 10;
  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return departments[index] || { name: '', acronym: '' };
  });

  return (
    <div className="grid-in-table">
      <table className="w-full table-fixed bg-white text-center">
        <thead className="bg-green text-white text-xs border-separate border border-white">
          <tr className="h-[30px]">
            <th scope="col" className="border border-white">College Name</th>
            <th scope="col" className="border border-white">College Code</th>
          </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto text-sm border-collapse border-y-2 border-gray-200">
          {rowsToDisplay.map((department, index) => (
            <DepartmentRow key={index} department={department} />
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default DepartmentTable;
