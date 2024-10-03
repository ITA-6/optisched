import CourseRow from "./CourseRow";

const CourseTable = ({courses, totalRows}) => {

  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return courses[index] || { name: '', code: '', category : '' };
  });

  return (
    <table className="w-full h-[100%] table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky top-0">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">Course Title</th>
          <th scope="col" className="border border-white">Course Code</th>
          <th scope="col" className="border border-white">Course type</th>
        </tr>
      </thead>
      <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
        {rowsToDisplay?.map((course, index) => (
          <CourseRow
            key={index}
            course={course}
          />
        ))}
      </tbody>
    </table>
  );
};
export default CourseTable;
