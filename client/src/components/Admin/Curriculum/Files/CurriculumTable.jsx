import CurriculumTableRow from "./CurriculumTableRow";

const CurriculumTable = ({ curriculum }) => {
  return (
    <>
      {" "}
      <div className="ml-8 rounded p-4">
        <div className="flex">
          <div className="flex flex-1 justify-between">
            <h3 className="mb-2 mt-8 text-lg font-semibold">
              {curriculum.year_level}
            </h3>
            <h3 className="mb-2 mt-8 text-lg font-semibold">
              {curriculum.semester}
            </h3>
          </div>
          <div className="ml-5 mt-5 flex items-center text-3xl font-bold">
            -
          </div>
        </div>
      </div>
      <div className="max-h-[300px] overflow-x-auto overflow-y-auto">
        <table className="mb-6 w-full table-auto border-collapse border border-gray-400">
          <thead className="bg-green">
            <tr>
              <th className="border border-gray-400 p-2 text-sm text-white">
                Course Code
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white">
                Course Title
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white">
                Lec
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white">
                Lab
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white">
                Total
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white">
                Pre/Co-Requisite
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white"></th>
            </tr>
          </thead>
          <tbody>
            {curriculum.courses?.map((course) => (
              <CurriculumTableRow
                key={course.id}
                course={course}
                total_units={curriculum.total_units}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurriculumTable;
