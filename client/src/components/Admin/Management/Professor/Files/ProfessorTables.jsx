import ProfessorRow from "./ProfessorRow";

const ProfessorTables = ({ DeleteProfessor, professors, openUpdate }) => {
  return (
    <>
      <table className="w-full table-fixed bg-white text-center grid-in-table">
        <thead className="bg-green">
          <tr className="h-[30px]">
            <th scope="col" className="h-[30px] w-[100px]">
              ID
            </th>
            <th scope="col" className="h-[30px] w-[150px]">
              Name
            </th>
            <th scope="col" className="h-[30px] w-[150px]">
              Birthdate
            </th>
            <th scope="col" className="h-[30px] w-[200px]">
              Email Address
            </th>
            <th scope="col" className="h-[30px] w-[150px]">
              Department
            </th>
            <th scope="col" className="h-[30px] w-[100px]">
              Masteral
            </th>
            <th scope="col" className="h-[30px] w-[150px]">
              Employment Status
            </th>
            <th scope="col" className="h-[30px] w-[200px]"></th>
          </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto">
          {professors?.map((professor) => (
            <ProfessorRow
              key={professor.prof_id}
              DeleteProfessor={DeleteProfessor}
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
