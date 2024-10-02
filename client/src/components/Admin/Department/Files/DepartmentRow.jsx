const DepartmentRow = ({department}) => {
  return (
   <>
     <tr className="h-10">
        <td className="border border-gray-100">{department.name}</td>
        <td className="border border-gray-100">{department.acronym}</td>
      </tr>
   </>
  )
}
export default DepartmentRow