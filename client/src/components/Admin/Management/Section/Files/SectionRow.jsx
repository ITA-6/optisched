const SectionRow = ({toggleDialog, section, openUpdate}) => {
  return (
    <tr key={section.id} className="h-[30px]">
        <td>{section.label}</td>
        <td>{section.year_level}</td>
        <td>{section.adviser}</td>
        <td>
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
        </td>
    </tr>
  )
}
export default SectionRow