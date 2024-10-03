import ProfessorRow from "./ProfessorRow";

const ProfessorTables = ({ professors, totalRows = 10 }) => {
  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return professors[index] || {
      prof_id: '',
      first_name: '',
      last_name: '',
      birth_date: '',
      email: '',
      department_name: '',
      has_masteral: '',
      employment_status: '',
    };
  });

  return (
    <table className="w-full h-full table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky top-0">
        <tr className="h-[30px]">
          <th scope="col" className="h-[30px] w-[100px]">ID</th>
          <th scope="col" className="h-[30px] w-[150px]">Name</th>
          <th scope="col" className="h-[30px] w-[150px]">Birthdate</th>
          <th scope="col" className="h-[30px] w-[200px]">Email Address</th>
          <th scope="col" className="h-[30px] w-[150px]">Department</th>
          <th scope="col" className="h-[30px] w-[100px]">Masteral</th>
          <th scope="col" className="h-[30px] w-[150px]">Employment Status</th>
        </tr>
      </thead>
      <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
        {rowsToDisplay.map((professor, index) => (
          <ProfessorRow
            key={index} 
            professor={professor}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ProfessorTables;
