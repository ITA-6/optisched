const ProgramRow = ({program}) => {
  return (
    <tr className="h-16">
      <td className="border-y-2 border-gray-200">{program.name}</td>
      <td className="border-y-2 border-gray-200">{program.department_name}</td>
    </tr>
  )
}
export default ProgramRow