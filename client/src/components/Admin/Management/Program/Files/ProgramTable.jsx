import ProgramRow from "./ProgramRow";

const ProgramTable = ({ toggleDialog, programs, openUpdate }) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green">
        <tr className="h-[30px]">
          <th scope="col">Program Name</th>
          <th scope="col">Department</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {programs?.map((program) => (
          <ProgramRow
            key={program.id}
            toggleDialog={toggleDialog}
            program={program}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ProgramTable;
