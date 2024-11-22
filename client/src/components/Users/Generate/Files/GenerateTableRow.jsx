import React from "react";

const GenerateTableRow = ({ course, sched }) => {
  let building_name = "";

  if (course.lab_room && course.lecture_room) {
    if (course.lecture_room.building_name === course.lab_room.building_name) {
      building_name = `${course.lecture_room.building_name}`; // Same room, no need for duplication
    } else {
      building_name = `${course.lecture_room.building_name} / ${course.lab_room.building_name}`;
    }
  } else if (course.lecture_room) {
    building_name = course.lecture_room.building_name;
  } else if (course.lab_room) {
    building_name = course.lab_room.building_name;
  } else {
    building_name = "TBA";
  }

  return (
    <tr>
      <td className="border-collapse border border-gray-300">
        {course.course.code}
      </td>
      <td className="border-collapse border border-gray-300">
        {course.course.description}
      </td>
      <td className="border-collapse border border-gray-300">
        {course.course.lecture_units}
      </td>
      <td className="border-collapse border border-gray-300">
        {course.course.lab_units}
      </td>
      <td className="border-collapse border border-gray-300">
        {course.course.lecture_units + course.course.lab_units}
      </td>
      <td className="border-collapse border border-gray-300">
        {course.lecture_time_range.day_of_week}{" "}
        {course.course.lab_units === 1
          ? "/ " + course.lab_time_range.day_of_week
          : ""}
      </td>
      <td className="border-collapse border border-gray-300">
        {course.lecture_time_range.start_time} -{" "}
        {course.lecture_time_range.end_time}
      </td>
      <td className="border-collapse border border-gray-300">
        {building_name}
      </td>

      <td className="border-collapse border border-gray-300">
        {course.lecture_room.number}{" "}
        {course.course.lab_units > 0 && !course.lecture_room.number
          ? course.lab_room.number
          : ""}{" "}
      </td>
      <td className="border-collapse border border-gray-300">
        {sched.section_label}
      </td>
    </tr>
  );
};

export default GenerateTableRow;
