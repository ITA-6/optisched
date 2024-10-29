import React from 'react'
import ViewTableRow from "./ViewTableRow"
const ViewTableSchedule = ({filteredScheduleProgram}) => {
  return (
    <table className="h-full table-auto w-full">
        <thead className='sticky top-0'>
          <tr>
              <th className='bg-green text-white p-1'>Professor Name</th>
              <th className='bg-green text-white'>Course Code</th>
              <th className='bg-green text-white'>Course Description</th>
              <th className='bg-green text-white'>Lec</th>
              <th className='bg-green text-white'>Lab</th>
              <th className='bg-green text-white'>Time</th>
              <th className='bg-green text-white'>Room</th>
              <th className='bg-green text-white'>Section</th>
          </tr>
        </thead>
        <tbody className='border border-gray-300 '>
          {filteredScheduleProgram && filteredScheduleProgram.length > 0 ? (
            filteredScheduleProgram?.map((program) => 
              program.courses?.map((course, index )=> (
                <ViewTableRow course={course} key={index} program={program} />
              ))
            )
          ) : (
            <tr>
              <td  colSpan="8" className="p-4 text-gray-500 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
    </table>
  )
}

export default ViewTableSchedule