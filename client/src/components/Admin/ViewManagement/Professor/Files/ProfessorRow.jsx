const ProfessorRow = ({professor}) => {
  return (
    <tr className="h-[30px]" key={professor.prof_id}>
        <th scope="row">{professor.prof_id}</th>
        <td>{`${professor.first_name} ${professor.last_name}`}</td>
        <td>{professor.birth_date}</td>
        <td>{professor.email}</td>
        <td className="w-[100px]">{professor.department_name}</td>
        <td>{professor.has_masteral === "Y" ? "Yes" : "No"}</td>
        <td>{professor.employment_status}</td>
  </tr>
  )
}
export default ProfessorRow