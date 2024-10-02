import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({departments}) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green text-white text-xs border-separate border border-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">College Name</th>
          <th scope="col" className="border border-white">College Code</th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto text-sm border-collapse border-gray-100">
        {departments?.map((department) => (
          <DepartmentRow
            key={department.id}
            department={department}
          />
        ))}
      </tbody>
    </table>
  );
};
export default DepartmentTable;
