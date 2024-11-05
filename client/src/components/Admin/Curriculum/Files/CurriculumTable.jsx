import CurriculumTableRow from "./CurriculumTableRow";

const CurriculumTable = ({ curriculum }) => {
  return (
    <>
      {" "}
      <div className="ml-8 rounded p-4">
        <div className="flex">
          <div className="flex flex-1 justify-between">
            <h3 className="mb-2 mt-8 text-lg font-semibold xm:text-xs sm:text-sm">
              {curriculum.year_level}
            </h3>
            <h3 className="mb-2 mt-8 text-lg font-semibold xm:text-xs sm:text-sm">
              {curriculum.semester}
            </h3>
          </div>
          <div className="ml-5 mt-5 flex items-center text-3xl font-bold">
            -
          </div>
        </div>
      </div>
      <div className="overflow-auto w-screen">
        <table className="mb-6 border-collapse border border-gray-400 xm:table-fixed sm:table-fixed lg:table-auto ">
          <thead className="bg-green">
            <tr>
              <th className="border border-gray-400 p-2 text-sm text-white xm:w-20 sm:w-28">
                Course Code
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white  xm:w-20 sm:w-28 md:w-auto">
                Course Title
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white  xm:w-20 sm:w-28">
                Lec
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white  xm:w-20 sm:w-28">
                Lab
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white  xm:w-20 sm:w-28">
                Total
              </th>
              <th className="border border-gray-400 p-2 text-sm text-white  xm:w-20 sm:w-28">
                Pre/Co-Requisite
              </th>
              <th className="border border-gray-400 p-2 text-sm text-whit xm:w-20 sm:w-28e"></th>
            </tr>
          </thead>
          <tbody className="sm:text-sm">
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
