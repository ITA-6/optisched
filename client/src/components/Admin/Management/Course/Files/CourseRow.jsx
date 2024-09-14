const CourseRow = ({ handleDelete, course, openUpdate }) => {
  return (
    <>
      <tr className="h-[30px]">
        <td>{course.name}</td>
        <td>{course.code}</td>
        <td>{course.category}</td>
        <td>
          <div className="flex items-center justify-center">
            <div className="ml-5 flex gap-2">
              <button
                className="-h5 w-16 bg-green text-white"
                onClick={() => openUpdate(course)}
              >
                {" "}
                Edit
              </button>
              <button
                className="-h5 w-16 bg-red-500 text-white"
                onClick={() => handleDelete(course.id)}
              >
                {" "}
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CourseRow;
