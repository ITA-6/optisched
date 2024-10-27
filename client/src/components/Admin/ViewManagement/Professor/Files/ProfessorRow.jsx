const ProfessorRow = ({professor, ViewProfessor}) => {
  return (
    <tr className="h-16" key={professor.prof_id} onClick={() => ViewProfessor(professor.prof_id)}>
        <th scope="row"  className="border-y-2 border-gray-200">{professor.prof_id}</th>
        <td  className="border-y-2 border-gray-200">{`${professor.first_name} ${professor.last_name}`}</td>
        <td  className="border-y-2 border-gray-200">{professor.birth_date}</td>
        <td  className="border-y-2 border-gray-200">{professor.email}</td>
        <td className="w-[100px] border-y-2 border-gray-200">{professor.department_name}</td>
        <td  className="border-y-2 border-gray-200">{professor.has_masteral === "Y" ? "Yes" : professor.has_masteral === "" ? "" : "No"}</td>
        <td  className="border-y-2 border-gray-200">{professor.employment_status}</td>
  </tr>
  )
}
export default ProfessorRow