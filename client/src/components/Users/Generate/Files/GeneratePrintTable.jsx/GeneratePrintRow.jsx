import React from 'react'

const GeneratePrintRow = ({course, sched}) => {
  return (
   <tr class="text-xs">
        <td>{course.course.code}</td>
        <td>{course.course.description}</td>
        <td>{course.course.lecture_units}</td>
        <td>{course.course.lab_units}</td>
        <td>{course.lecture_time_range.day_of_week} {course.course.lab_units === 1 ? "/ " + course.lab_time_range.day_of_week : ""}</td>
        <td>{course.lecture_time_range.start_time} - {course.lecture_time_range.end_time} / {course.lecture_time_range.start_time} - {course.lecture_time_range.end_time}</td>
        <td>{course.lecture_room.number} {course.course.lab_units === 1 ? course.lab_room.number : ""} </td>
        <td>{sched.section_label}</td> 
   </tr>
  )
}

export default GeneratePrintRow