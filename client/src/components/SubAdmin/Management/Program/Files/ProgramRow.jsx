const ProgramRow = ({toggleDialog, program, openUpdate}) => {
  const hasData = program.name && program.department_name;
  return (
    <tr className="h-16">
      <td className="border-y-2 border-gray-200">{program.name}</td>
      <td className="border-y-2 border-gray-200">{program.department_name}</td>
      <td className="border-y-2 border-gray-200">
        {hasData && (
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
        )}
      </td>
    </tr>
  )
}
export default ProgramRow