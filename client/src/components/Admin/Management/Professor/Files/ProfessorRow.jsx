const ProfessorRow = ({DeleteProfessor, professor, openUpdate}) => {
  return (
    <tr className="h-[30px]" key={professor.prof_id}>
        <th scope="row">{professor.prof_id}</th>
        <td>{`${professor.first_name} ${professor.last_name}`}</td>
        <td>{professor.birth_date}</td>
        <td>{professor.email}</td>
        <td className="w-[100px]">{professor.department_name}</td>
        <td>{professor.has_masteral === "Y" ? "Yes" : "No"}</td>
        <td>{professor.employment_status}</td>
        <td>
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
                    onClick={(() => DeleteProfessor(professor.prof_id ))}
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