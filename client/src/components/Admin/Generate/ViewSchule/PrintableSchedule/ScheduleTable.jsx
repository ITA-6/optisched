import React from 'react'
import ScheduleRow from "./ScheduleRow"
const ScheduleTable = ({sectionArray}) => {
  return (
    <table className=" table-auto w-full">
        <thead>
          <tr className='border-collapse border-black border-t border-l'>
              <th className=' text-[0.5rem] text-black border-black border-t border-l'>Professor Name</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l'>Course Code</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l'>Course Description</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l'>Lec</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l'>Lab</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l'>Time</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l'>Room</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-r'>Section</th>
          </tr>
        </thead>
        <tbody className='border-t border-l border-gray-300 text-xs '>
           {sectionArray.map(sectionTable => (
              sectionTable.courses.map((subject, index) =>(
                <ScheduleRow subject={subject} sectionTable={sectionTable} key={index} />
              ))
           ))}
        </tbody>
    </table>
  )
}

export default ScheduleTable