import CourseRow from "./CourseRow";

const CourseTable = ({courses}) => {
  return (
    <table className="w-full table-fixed bg-gray-200 text-center grid-in-table">
      <thead className="bg-green text-white text-xs">
        <tr className="h-[30px]">
          <th scope="col">Course Title</th>
          <th scope="col">Course Code</th>
          <th scope="col">Course type</th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto">
        {courses?.map((course) => (
          <CourseRow
            key={course.id}
            course={course}
          />
        ))}
      </tbody>
    </table>
  );
};
export default CourseTable;
