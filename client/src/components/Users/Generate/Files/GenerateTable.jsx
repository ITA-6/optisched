import React from 'react'
import GenerateTableRow from './GenerateTableRow'

const GenerateTable = ({data}) => {

  console.log(data)
  return (
    <table className="min-w-full xm:table-fixed sm:table-fixed lg:table-auto">
      <thead className="bg-green">
        <tr className='text-white xm:text-[0.6em] sm:text-[0.7em] '>
          <th className='p-1 xm:w-20 sm:w-32'>Course Code</th>
          <th className='xm:w-44  sm:w-44 '>Course Description</th>
          <th className='xm:w-20 sm:w-20'>Lec Units</th>
          <th className='xm:w-20 sm:w-20'>Lab Units</th>
          <th className='xm:w-44 sm:w-44'>Day</th>
          <th className='xm:w-44 sm:w-44'>Time</th>
          <th className='xm:w-20 sm:w-20'>Room</th>
          <th className='xm:w-20 sm:w-20'>Section</th>
        </tr>
      </thead>
      <tbody className='xm:text-xs sm:text-sm text-center'>
        {data.map(sched => sched.courses.map((course, index) =>
          <GenerateTableRow course={course} key={index} sched={sched}/>
        ))}
      </tbody>
    </table>
  )
}

export default GenerateTable