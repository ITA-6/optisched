import React from 'react'

const ViewTableRow = ({course, program}) => {
  return (
    <tr  className='text-center'>
        <td>{course.professor_name ? course.professor_name : "TBA"}</td>
        <td>{course.course_code}</td>
        <td>{course.course_description}</td>
        <td>{course.lecture_units}</td>
        <td>{course.lab_units}</td>
        <td>{course.time}</td>
        <td>TBA</td>
        <td>{program.year_level}{program.section_label}</td>
    </tr>
  )
}

export default ViewTableRow