import ProgramRow from "./ProgramRow";

const ProgramTable = ({ toggleDialog, programs, openUpdate }) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green text-xs text-white border-separate border border-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">Program Name</th>
          <th scope="col" className="border border-white">Department</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="border-collapse border border-gray-100">
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
