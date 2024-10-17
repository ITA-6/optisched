const CourseRow = ({ toggleDialog, course, openUpdate }) => {

  console.log(course.need_masteral)
  const hasData = course.name && course.code;
  return (
    <>
      <tr className="h-16">
        <td className="border-y-2 border-gray-200">{course.name}</td>
        <td className="border-y-2 border-gray-200">{course.code}</td>
        <td className="border-y-2 border-gray-200">{course.category}</td>
        <td className="border-y-2 border-gray-200">{course.lecture}</td>
        <td className="border-y-2 border-gray-200">{course.laboratory}</td>
        <td className="border-y-2 border-gray-200">{course.total_units}</td>
        <td className="border-y-2 border-gray-200">{course.total_hours}</td>
        <td className="border-y-2 border-gray-200">{course.need_masteral === true  ? "Yes" : "No"}</td>
        <td className="border-y-2 border-gray-200">
         {hasData && (
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
         )}
        </td>
      </tr>
    </>
  );
};

export default CourseRow;
