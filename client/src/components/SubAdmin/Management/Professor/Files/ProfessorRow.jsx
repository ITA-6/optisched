const ProfessorRow = ({ toggleDialog, filteredUsers, openUpdate }) => {
  const hasData = filteredUsers.prof_id && filteredUsers.first_name;
  return (
    <tr className="h-16" key={filteredUsers.prof_id}>
      <th scope="row" className="border-y-2 border-gray-200 px-5">
        {filteredUsers.prof_id}
      </th>
      <td className="border-y-2 border-gray-200">{`${filteredUsers.first_name} ${filteredUsers.last_name}`}</td>
      <td className="border-y-2 border-gray-200">TBA</td>
      <td className="border-y-2 border-gray-200">{filteredUsers.birth_date}</td>
      <td className="border-y-2 border-gray-200">{filteredUsers.email}</td>
      <td className="border-y-2 border-gray-200">
        {filteredUsers.department_name}
      </td>
      <td className="border-y-2 border-gray-200">
        {filteredUsers.has_masteral === "Y"
          ? "Yes"
          : filteredUsers.has_masteral === ""
            ? ""
            : "No"}
      </td>
      <td className="border-y-2 border-gray-200">
        {filteredUsers.employment_status}
      </td>
      <td className="border-y-2 border-gray-200">
        {hasData && (
          <div className="flex items-center justify-center">
            <div className="ml-5 flex gap-2">
              <button
                className="-h5 w-16 bg-green text-white"
                onClick={() => openUpdate(filteredUsers)}
              >
                Edit
              </button>
              <button
                className="-h5 w-16 bg-red-500 text-white"
                onClick={() => toggleDialog(filteredUsers.prof_id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};
export default ProfessorRow;
