const ProgramRow = ({toggleDialog, program, openUpdate}) => {
  return (
    <tr>
    <td className="border border-gray-100">{program.name}</td>
    <td className="border border-gray-100">{program.department_name}</td>
    <td className="border border-gray-100">
      <div className="flex items-center justify-center">
        <div className="ml-5 flex gap-2">
          <button
            className="h-7 w-20 bg-green text-white"
            onClick={() => openUpdate(program)}
          >
            Edit
          </button>
          <button
            className="h-7 w-20 bg-red-500 text-white"
            onClick={() => toggleDialog(program.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </td>
  </tr>
  )
}
export default ProgramRow