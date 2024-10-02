import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({ departments, toggleDialog, openUpdate }) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green text-xs text-white border-separate border border-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">College Name</th>
          <th scope="col" className="border border-white">College Code</th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto border-collapse border border-gray-100">
        {departments?.map((department) => (
          <DepartmentRow
            key={department.id}
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
