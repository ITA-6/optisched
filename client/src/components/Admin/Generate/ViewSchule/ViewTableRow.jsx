import React from 'react'

const ViewTableRow = ({subject, sectionTable}) => {
  return (
    <tr className="text-center">
      <td>{subject.professor_name ? subject.professor_name : "TBA"}</td>
      <td>{subject.course_code}</td>
      <td>{subject.course_description}</td>
      <td>{subject.lecture_units}</td>
      <td>{subject.lab_units}</td>
      <td>{subject.lecture_time_range}</td>
      <td>{subject.lecture_room_number}</td>
      <td>{sectionTable.year_level}{sectionTable.section_label}</td>
    </tr>
  )
}

export default ViewTableRow