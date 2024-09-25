const CourseRow = ({course}) => {
  return (
    <>
      <tr className="h-[30px]">
        <td>{course.name}</td>
        <td>{course.code}</td>
        <td>{course.category}</td>
      </tr>
    </>
  );
};

export default CourseRow;
