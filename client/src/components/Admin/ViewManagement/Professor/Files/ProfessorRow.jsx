const ProfessorRow = ({filteredUsers, ViewProfessor}) => {
  return (
    <tr className="h-16" key={filteredUsers.prof_id} onClick={() => ViewProfessor(filteredUsers.prof_id)}>
        <th scope="row"  className="border-y-2 border-gray-200">{filteredUsers.prof_id}</th>
        <td  className="border-y-2 border-gray-200">{`${filteredUsers.first_name} ${filteredUsers.last_name}`}</td>
        <td  className="border-y-2 border-gray-200">{filteredUsers.birth_date}</td>
        <td  className="border-y-2 border-gray-200">{filteredUsers.email}</td>
        <td className="w-[100px] border-y-2 border-gray-200">{filteredUsers.department_name}</td>
        <td  className="border-y-2 border-gray-200">{filteredUsers.has_masteral === "Y" ? "Yes" :filteredUsers.has_masteral === "" ? "" : "No"}</td>
        <td  className="border-y-2 border-gray-200">{filteredUsers.employment_status}</td>
  </tr>
  )
}
export default ProfessorRow