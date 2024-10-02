import ProgramRow from "./ProgramRow";

const ProgramTable = ({programs}) => {
  return (
    <table className="w-full table-fixed bg-gray-200 text-center grid-in-table">
      <thead className="bg-green text-white text-xs">
        <tr className="h-[30px]">
          <th scope="col">Program Name</th>
          <th scope="col">Department</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {programs?.map((program) => (
          <ProgramRow
            key={program.id}
            program={program}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ProgramTable;
