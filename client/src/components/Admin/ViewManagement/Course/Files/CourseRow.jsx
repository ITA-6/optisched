const CourseRow = ({course}) => {
  return (
    <>
      <tr className="h-16">
        <td className="border-y-2 border-gray-200">{course.name}</td>
        <td className="border-y-2 border-gray-200">{course.code}</td>
        <td className="border-y-2 border-gray-200">{course.category}</td>
      </tr>
    </>
  );
};

export default CourseRow;
