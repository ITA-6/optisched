const CurriculumTableRow = ({ course, total_units }) => {
  return (
    <tr>
      <td className="border border-gray-400 p-2 text-sm">{course.code}</td>
      <td className="border border-gray-400 p-2 text-sm">{course.name}</td>
      <td className="border border-gray-400 p-2 text-sm">
        {course.lecture_unit}
      </td>
      <td className="border border-gray-400 p-2 text-sm">{course.lab_unit}</td>
      <td className="border border-gray-400 p-2 text-sm">{total_units}</td>
      <td className="border border-gray-400 p-2 text-sm">NONE</td>
      <td className="border border-gray-400 p-2 text-sm">
        <div className="flex items-center justify-center gap-5">
          <button type="button">Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default CurriculumTableRow;
