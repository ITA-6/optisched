import ProfessorRow from "./ProfessorRow";

const ProfessorTables = ({professors}) => {
  return (
    <>
      <table className="w-full table-fixed bg-gray-200 text-center grid-in-table">
        <thead className="bg-green text-white text-xs">
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
          </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto">
          {professors?.map((professor) => (
            <ProfessorRow
              key={professor.prof_id}
              professor={professor}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ProfessorTables;
