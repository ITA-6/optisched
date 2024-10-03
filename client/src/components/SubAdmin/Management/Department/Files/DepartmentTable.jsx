import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({ departments, toggleDialog, openUpdate, totalRows}) => {
  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return departments[index] || { name: '', acronym: '' };
  });
  return (
    <table className="w-full h-[100%] table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky top-0">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">College Name</th>
          <th scope="col" className="border border-white">College Code</th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto border-collapse border border-gray-100">
        {rowsToDisplay.map((department, index) => (
          <DepartmentRow
            key={index}
            toggleDialog={toggleDialog}
            department={department}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};
export default DepartmentTable;
