const SectionRow = ({toggleDialog, filteredSections, openUpdate}) => {
    const hasData = filteredSections.label && filteredSections.year_level
  return (
    <tr key={filteredSections.id} className="h-16">
       <td className="border-y-2 border-gray-200">{filteredSections.label}</td>
        <td className="border-y-2 border-gray-200">{filteredSections.year_level}</td>
        <td className="border-y-2 border-gray-200">{filteredSections.adviser}</td>
        <td className="border-y-2 border-gray-200">
            {hasData && (
            <div className="flex items-center justify-center">
                <div className="ml-5 flex gap-2">
                    <button
                        className="-h5 w-16 bg-green text-white"
                        onClick={() => openUpdate(filteredSections)}
                    >
                        {" "}
                        Edit
                    </button>
                    <button
                        className="-h5 w-16 bg-red-500 text-white"
                        onClick={() => toggleDialog(filteredSections.id)}
                    >
                        {" "}
                        Delete
                    </button>
                </div>
            </div>
            )}
        </td>
    </tr>
  )
}
export default SectionRow