const ProfessorRow = ({toggleDialog, professor, openUpdate}) => {
    const hasData = professor.prof_id && professor.first_name;
  return (
    <tr className="h-16" key={professor.prof_id}>
        <th scope="row"  className="border-y-2 border-gray-200">{professor.prof_id}</th>
        <td  className="border-y-2 border-gray-200">{`${professor.first_name} ${professor.last_name}`}</td>
        <td  className="border-y-2 border-gray-200">{professor.birth_date}</td>
        <td  className="border-y-2 border-gray-200">{professor.email}</td>
        <td className="w-[100px] border-y-2 border-gray-200">{professor.department_name}</td>
        <td  className="border-y-2 border-gray-200">{professor.has_masteral === "Y" ? "Yes" : professor.has_masteral === "" ? "" : "No"}</td>
        <td  className="border-y-2 border-gray-200">{professor.employment_status}</td>
        <td className="border-y-2 border-gray-200">
           {hasData && (
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
           )}
        </td>
  </tr>
  )
}
export default ProfessorRow