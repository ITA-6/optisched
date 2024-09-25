import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({departments}) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green">
        <tr className="h-[30px]">
          <th scope="col">College Name</th>
          <th scope="col">College Code</th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto">
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
