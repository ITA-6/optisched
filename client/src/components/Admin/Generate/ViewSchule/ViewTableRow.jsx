import React from 'react'

const ViewTableRow = ({subject, sectionTable}) => {
  return (
    <tr className="text-center">
      <td>{subject.professor_name ? subject.professor_name : "TBA"}</td>
      <td>{subject.course_code}</td>
      <td>{subject.course_description}</td>
      <td>{subject.lecture_units}</td>
      <td>{subject.lab_units}</td>
      <td>{subject.time}</td>
      <td>TBA</td>
      <td>{sectionTable.year_level}{sectionTable.section_label}</td>
    </tr>
  )
}

export default ViewTableRow