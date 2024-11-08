import React from 'react'

const ViewTableRow = ({course, sectionArray}) => {
  
  return (
    <tr className="text-center">
      <td className='w-96'>{course.professor_name ? course.professor_name : "TBA"}</td>
      <td className='w-32'>{course.course_code}</td>
      <td className='w-96'>{course.course_description}</td>
      <td className='w-32'>{course.lecture_units}</td>
      <td className='w-32'>{course.lab_units}</td>
      <td className='w-64'>{course.lecture_day_of_week}{course.lec_units !== 3 ? ((course.lab_day_of_week === "Day Not Assigned" ? "" : "/" + course.lab_day_of_week)) : "" } </td>
      <td className='w-64'>{course.lecture_time_range}{course.lec_units !== 3 ? ((course.lab_time_range === "Time Not Assigned" ? "" : "/" + course.lab_time_range)) : "" }</td>
      <td className='w-32'>{course.lecture_room_number}</td>
      <td className='w-32'>{sectionArray.year_level}{sectionArray.section_label}</td>
    </tr>
  )
}

export default ViewTableRow