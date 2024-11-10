const CourseRow = ({ toggleDialog, filteredCourses, openUpdate }) => {
  const hasData = filteredCourses.name && filteredCourses.code;
  return (
    <>
      <tr className="h-16">
        <td className="border-y-2 border-gray-200">{filteredCourses.name}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.code}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.category}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.lecture_unit}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.lab_unit}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.lecture_unit + filteredCourses.lab_unit}</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.lecture_hours + filteredCourses.lab_hours}</td>
        <td className="border-y-2 border-gray-200">NONE</td>
        <td className="border-y-2 border-gray-200">{filteredCourses.need_masteral === true  ? "Yes" : "No"}</td>
        <td className="border-y-2 border-gray-200">
         {hasData && (
             <div className="flex items-center justify-center">
              <div className="ml-5 flex gap-2">
                <button
                  className="-h5 w-16 bg-green text-white"
                  onClick={() => openUpdate(filteredCourses)}
                >
                  {" "}
                  Edit
                </button>
                <button
                  className="-h5 w-16 bg-red-500 text-white"
                  onClick={() => toggleDialog(filteredCourses.id)}
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
