const DepartmentRow = ({DeleteDepartment, department, openUpdate}) => {
  return (
   <>
     <tr>
        <td>{department.name}</td>
        <td>{department.acronym}</td>
        <td>
          <div className="flex items-center justify-center">
            <div className="ml-5 flex gap-2">
              <button
                className="h-7 w-20 bg-green text-white"
                onClick={() => openUpdate(department)}
              >
                Edit
              </button>
              <button
                onClick={() => DeleteDepartment(department.id)}
                className="h-7 w-20 bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
   </>
  )
}
export default DepartmentRow