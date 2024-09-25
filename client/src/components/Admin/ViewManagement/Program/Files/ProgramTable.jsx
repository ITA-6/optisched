import ProgramRow from "./ProgramRow";

const ProgramTable = ({programs}) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green">
        <tr className="h-[30px]">
          <th scope="col">Program Name</th>
          <th scope="col">Department</th>
        </tr>
      </thead>
      <tbody>
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
