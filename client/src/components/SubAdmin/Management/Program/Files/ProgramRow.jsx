const ProgramRow = ({toggleDialog, filteredPrograms, openUpdate}) => {
  const hasData = filteredPrograms.name && filteredPrograms.department_name;
  return (
    <tr className="h-16">
      <td className="border-y-2 border-gray-200">{filteredPrograms.name}</td>
      <td className="border-y-2 border-gray-200">{filteredPrograms.acronym}</td>
      <td className="border-y-2 border-gray-200">{filteredPrograms.department_name}</td>
      <td className="border-y-2 border-gray-200">
        {hasData && (
          <div className="flex items-center justify-center">
            <div className="ml-5 flex gap-2">
              <button
                className="h-7 w-20 bg-green text-white"
                onClick={() => openUpdate(filteredPrograms)}
              >
                Edit
              </button>
              <button
                className="h-7 w-20 bg-red-500 text-white"
                onClick={() => toggleDialog(filteredPrograms.id)}
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