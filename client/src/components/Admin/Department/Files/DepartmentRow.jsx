const DepartmentRow = ({department}) => {
  return (
   <>
     <tr>
        <td>{department.name}</td>
        <td>{department.acronym}</td>
      </tr>
   </>
  )
}
export default DepartmentRow