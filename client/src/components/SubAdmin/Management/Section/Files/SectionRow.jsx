const SectionRow = ({toggleDialog, section, openUpdate}) => {
    const hasData = section.label && section.year_level
  return (
    <tr key={section.id} className="h-16">
       <td className="border-y-2 border-gray-200">{section.label}</td>
        <td className="border-y-2 border-gray-200">{section.year_level}</td>
        <td className="border-y-2 border-gray-200">{section.adviser}</td>
        <td className="border-y-2 border-gray-200">
            {hasData && (
            <div className="flex items-center justify-center">
                <div className="ml-5 flex gap-2">
                    <button
                        className="-h5 w-16 bg-green text-white"
                        onClick={() => openUpdate(section)}
                    >
                        {" "}
                        Edit
                    </button>
                    <button
                        className="-h5 w-16 bg-red-500 text-white"
                        onClick={() => toggleDialog(section.id)}
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