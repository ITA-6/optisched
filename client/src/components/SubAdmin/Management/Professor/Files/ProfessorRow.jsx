const ProfessorRow = ({toggleDialog, professor, openUpdate}) => {
  return (
    <tr className="h-[30px]" key={professor.prof_id}>
        <th scope="row" className="border border-gray-100">{professor.prof_id}</th>
        <td className="border border-gray-100">{`${professor.first_name} ${professor.last_name}`}</td>
        <td className="border border-gray-100">{professor.birth_date}</td>
        <td className="border border-gray-100">{professor.email}</td>
        <td className="w-[100px] border border-gray-100">{professor.department_name}</td>
        <td className="border border-gray-100">{professor.has_masteral === "Y" ? "Yes" : "No"}</td>
        <td className="border border-gray-100">{professor.employment_status}</td>
        <td className="border border-gray-100">
            <div className="flex items-center justify-center">
                <div className="ml-5 flex gap-2">
                <button
                    className="-h5 w-16 bg-green text-white"
                    onClick={() => openUpdate(professor)}
                >
                    Edit
                </button>
                <button
                    className="-h5 w-16 bg-red-500 text-white"
                    onClick={(() => toggleDialog(professor.prof_id))}
                >
                    Delete
                </button>
                </div>
            </div>
        </td>
  </tr>
  )
}
export default ProfessorRow