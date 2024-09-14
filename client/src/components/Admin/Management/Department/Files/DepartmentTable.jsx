import DepartmentRow from "./DepartmentRow"

const DepartmentTable = ({departments, DeleteDepartment , openUpdate}) => {
  return (
        <table className="w-full table-fixed bg-white text-center grid-in-table">
            <thead className="bg-green">
              <tr className="h-[30px]">
                <th scope="col">Department Name</th>
                <th scope="col">Department Code</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
            {departments?.map((department) => (
                <DepartmentRow 
                  key={department.id}
                  DeleteDepartment={DeleteDepartment}
                  department={department}
                  openUpdate={openUpdate}
                />
             ))}
            </tbody>
        </table>
  )
}
export default DepartmentTable