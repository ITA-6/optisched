const CourseRow = ({ toggleDialog, course, openUpdate }) => {
  return (
    <>
      <tr className="h-[30px]">
        <td className="border border-gray-100">{course.name}</td>
        <td className="border border-gray-100">{course.code}</td>
        <td className="border border-gray-100">{course.category}</td>
        <td className="border border-gray-100">
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
                onClick={() => toggleDialog(course.id)}
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
