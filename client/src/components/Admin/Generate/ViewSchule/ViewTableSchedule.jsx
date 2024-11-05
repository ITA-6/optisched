import React from 'react'
import ViewTableRow from "./ViewTableRow"
const ViewTableSchedule = ({sectionArray}) => {

  console.log(sectionArray)
  return (
    <table className="h-full w-full table-fixed mb-10 lg:table-auto">
        <thead>
          <tr className='sm:text-sm md:text-sm'>
              <th className='bg-green text-white p-1 sm:w-44'>Professor Name</th>
              <th className='bg-green text-white sm:w-44'>Course Code</th>
              <th className='bg-green text-white sm:w-44'>Course Description</th>
              <th className='bg-green text-white sm:w-44'>Lec</th>
              <th className='bg-green text-white sm:w-44'>Lab</th>
              <th className='bg-green text-white sm:w-44'>Day</th>
              <th className='bg-green text-white sm:w-44'>Time</th>
              <th className='bg-green text-white sm:w-44'>Room</th>
              <th className='bg-green text-white sm:w-44'>Section</th>
          </tr>
        </thead>
        <tbody className='border border-gray-300 sm:text-sm'>
          {sectionArray.courses.map((course, index )=> (
            <ViewTableRow course={course} key={index} sectionArray={sectionArray}/>
          ))}
        </tbody>
    </table>
  )
}

export default ViewTableSchedule