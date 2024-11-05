const ProfessorRow = ({dynamicFiltered, ViewProfessor}) => {
  return (
    <tr className="h-16" key={dynamicFiltered.prof_id} onClick={() => ViewProfessor(dynamicFiltered.prof_id)}>
        <th scope="row"  className="border-y-2 border-gray-200">{dynamicFiltered.prof_id}</th>
        <td  className="border-y-2 border-gray-200">{`${dynamicFiltered.first_name} ${dynamicFiltered.last_name}`}</td>
        <td  className="border-y-2 border-gray-200">{dynamicFiltered.birth_date}</td>
        <td  className="border-y-2 border-gray-200">{dynamicFiltered.email}</td>
        <td className="w-[100px] border-y-2 border-gray-200">{dynamicFiltered.department_name}</td>
        <td  className="border-y-2 border-gray-200">{dynamicFiltered.has_masteral === "Y" ? "Yes" :dynamicFiltered.has_masteral === "" ? "" : "No"}</td>
        <td  className="border-y-2 border-gray-200">{dynamicFiltered.employment_status}</td>
  </tr>
  )
}
export default ProfessorRow