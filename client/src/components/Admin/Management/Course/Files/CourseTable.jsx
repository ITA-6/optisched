import CourseRow from "./CourseRow";

const CourseTable = ({ handleDelete, courses, openUpdate }) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green">
        <tr className="h-[30px]">
          <th scope="col">Course Title</th>
          <th scope="col">Course Code</th>
          <th scope="col">Course type</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto">
        {courses?.map((course) => (
          <CourseRow
            key={course.id}
            handleDelete={handleDelete}
            course={course}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};
export default CourseTable;
