import ProfessorRow from "./ProfessorRow";

const ProfessorTables = ({ toggleDialog, professors, openUpdate, totalRows }) => {
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
    <>
     <table className="w-full h-[100%] table-fixed bg-white text-center">
     <thead className="bg-green text-white text-xs border-separate border border-white sticky -top-0.5">
          <tr className="h-[30px] ">
            <th scope="col" className="h-[30px] w-[100px] border border-white">
              ID
            </th>
            <th scope="col" className="h-[30px] w-[150px] border border-white">
              Name
            </th>
            <th scope="col" className="h-[30px] w-[150px] border border-white">
              Birthdate
            </th>
            <th scope="col" className="h-[30px] w-[200px] border border-white">
              Email Address
            </th>
            <th scope="col" className="h-[30px] w-[150px] border border-white">
              Department
            </th>
            <th scope="col" className="h-[30px] w-[100px] border border-white">
              Masteral
            </th>
            <th scope="col" className="h-[30px] w-[150px] border border-white">
              Employment Status
            </th>
            <th scope="col" className="h-[30px] w-[200px] border border-white"></th>
          </tr>
        </thead>
        <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
          {rowsToDisplay?.map((professor, index) => (
            <ProfessorRow
              key={index}
              toggleDialog={toggleDialog}
              professor={professor}
              openUpdate={openUpdate}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ProfessorTables;
