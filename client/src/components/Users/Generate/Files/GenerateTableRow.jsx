import React from 'react'

const GenerateTableRow = ({course, sched}) => {
  return (
    <tr>
        <td className='border border-collapse border-gray-300'>{course.course.code}</td>
        <td  className='border border-collapse border-gray-300'>{course.course.description}</td>
        <td  className='border border-collapse border-gray-300'>{course.course.lecture_units}</td>
        <td  className='border border-collapse border-gray-300'>{course.course.lab_units}</td>
        <td  className='border border-collapse border-gray-300'>{course.lecture_time_range.day_of_week} {course.course.lab_units === 1 ? "/ " + course.lab_time_range.day_of_week : ""}</td>
        <td  className='border border-collapse border-gray-300'>{course.lecture_time_range.start_time} - {course.lecture_time_range.end_time}</td>
        <td  className='border border-collapse border-gray-300'>{course.lecture_room.number} {course.course.lab_units > 0 && !course.lecture_room.number ? course.lab_room.number : ""} </td>
        <td  className='border border-collapse border-gray-300'>{sched.section_label}</td> 
    </tr>
  )
}

export default GenerateTableRow