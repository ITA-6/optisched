const DepartmentRow = ({department}) => {
  return (
   <>
     <tr className="h-16">
        <td className="border-y-2 border-gray-200">{department.name}</td>
        <td className="border-y-2 border-gray-200">{department.acronym}</td>
      </tr>
   </>
  )
}
export default DepartmentRow