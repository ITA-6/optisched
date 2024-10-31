import React from 'react'

const ScheduleRow = ({subject, sectionTable}) => {
  return (
    <tr className="text-center text-xs border-black">
      <td className='text-[0.5rem]  border-b border-l border-black'>{subject.professor_name ? subject.professor_name : "TBA"}</td>
      <td className='text-[0.5rem]  border-b border-l border-black'>{subject.course_code}</td>
      <td className='text-[0.5rem]  border-b border-l border-black'>{subject.course_description}</td>
      <td className='text-[0.5rem]  border-b border-l border-black'>{subject.lecture_units}</td>
      <td className='text-[0.5rem]  border-b border-l border-black'>{subject.lab_units}</td>
      <td className='text-[0.5rem]  border-b border-l border-black'>{subject.time}</td>
      <td className='text-[0.5rem]  border-b border-l border-black'>TBA</td>
      <td className='text-[0.5rem]  border-b border-l border-r border-black'>{sectionTable.year_level}{sectionTable.section_label}</td>
    </tr>
  )
}

export default ScheduleRow