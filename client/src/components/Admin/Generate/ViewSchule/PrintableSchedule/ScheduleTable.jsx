import React from 'react'
import ScheduleRow from "./ScheduleRow"
const ScheduleTable = ({sectionArray}) => {
  return (
    <table className=" table-auto w-full">
        <thead>
          <tr className='border-collapse border-black border-t border-l'>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-b'>Professor Name</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-b'>Course Code</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-b'>Course Description</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-b'>Lec</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-b'>Lab</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-b'>Time</th>
              <th className=' text-[0.5rem] text-black border-black border-t border-l border-b'>Room</th>
              <th className=' text-[0.5rem] text-black border-black border'>Section</th>
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