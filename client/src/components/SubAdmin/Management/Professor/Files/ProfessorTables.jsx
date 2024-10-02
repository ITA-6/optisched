import ProfessorRow from "./ProfessorRow";

const ProfessorTables = ({ toggleDialog, professors, openUpdate }) => {
  return (
    <>
      <table className="w-full table-fixed bg-white text-center grid-in-table">
        <thead className="bg-green text-xs text-white border-separate border border-white">
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
        <tbody className="mb-10 h-full overflow-auto border-collapse border border-gray-100">
          {professors?.map((professor) => (
            <ProfessorRow
              key={professor.prof_id}
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
