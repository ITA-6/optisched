const ProgramRow = ({filteredPrograms}) => {
  return (
    <tr className="h-16">
      <td className="border-y-2 border-gray-200">{filteredPrograms.name}</td>
      <td className="border-y-2 border-gray-200">{filteredPrograms.department_name}</td>
    </tr>
  )
}
export default ProgramRow