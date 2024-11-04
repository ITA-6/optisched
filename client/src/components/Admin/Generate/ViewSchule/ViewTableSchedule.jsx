import React from 'react'
import ViewTableRow from "./ViewTableRow"
const ViewTableSchedule = ({sectionArray}) => {

  console.log(sectionArray)
  return (
    <table className="h-full table-fixed">
        <thead>
          <tr>
              <th className='bg-green text-white p-1'>Professor Name</th>
              <th className='bg-green text-white'>Course Code</th>
              <th className='bg-green text-white'>Course Description</th>
              <th className='bg-green text-white'>Lec</th>
              <th className='bg-green text-white'>Lab</th>
              <th className='bg-green text-white'>Day</th>
              <th className='bg-green text-white'>Time</th>
              <th className='bg-green text-white'>Room</th>
              <th className='bg-green text-white'>Section</th>
          </tr>
        </thead>
        <tbody className='border border-gray-300 '>
          {sectionArray.courses.map((course, index )=> (
            <ViewTableRow course={course} key={index} sectionArray={sectionArray}/>
          ))}
        </tbody>
    </table>
  )
}

export default ViewTableSchedule