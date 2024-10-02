import CourseRow from "./CourseRow";

const CourseTable = ({ toggleDialog, courses, openUpdate }) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green text-xs text-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">Course Title</th>
          <th scope="col" className="border border-white">Course Code</th>
          <th scope="col" className="border border-white">Course type</th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto border-collapse border border-gray-100">
        {courses?.map((course) => (
          <CourseRow
            key={course.id}
            toggleDialog={toggleDialog}
            course={course}
            openUpdate={openUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};
export default CourseTable;
