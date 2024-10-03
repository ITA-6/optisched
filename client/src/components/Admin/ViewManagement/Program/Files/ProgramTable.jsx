import ProgramRow from "./ProgramRow";

const ProgramTable = ({programs, totalRows}) => {
  console.log(programs)
  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return programs[index] || { name: '', department_name: '' };
  });
  return (
    <table className="w-full h-[100%] table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky top-0">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">Program Name</th>
          <th scope="col" className="border border-white">Department</th>
        </tr>
      </thead>
      <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
        {rowsToDisplay?.map((program, index) => (
          <ProgramRow
            key={index}
            program={program}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ProgramTable;
