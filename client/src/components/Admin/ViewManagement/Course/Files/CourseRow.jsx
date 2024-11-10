const CourseRow = ({filteredCourses}) => {
  return (
    <>
      <tr className="h-16">
        <td className="border-y-2 border-gray-200">{filteredCourses.name}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.code}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.category}</td>
      </tr>
    </>
  );
};

export default CourseRow;
