const ProgramRow = ({program}) => {
  return (
    <tr>
    <td>{program.name}</td>
    <td>{program.department_name}</td>
  </tr>
  )
}
export default ProgramRow