import React from 'react'
import GeneratePrintRow from './GeneratePrintRow';

const GeneratePrintTable= ({data}) => {
  return (
    <table class="min-w-full xm:table-fixed sm:table-fixed lg:table-auto">
      <thead class="bg-green ">
        <tr class='text-white xm:text-[0.6em] sm:text-[0.7em] '>
          <th class='p-1 xm:w-20 sm:w-32'>Course Code</th>
          <th class='xm:w-44  sm:w-44 '>Course Description</th>
          <th class='xm:w-20 sm:w-20'>Lec Units</th>
          <th class='xm:w-20 sm:w-20'>Lab Units</th>
          <th class='xm:w-44 sm:w-44'>Day</th>
          <th class='xm:w-44 sm:w-44'>Time</th>
          <th class='xm:w-20 sm:w-20'>Room</th>
          <th class='xm:w-20 sm:w-20'>Section</th>
        </tr>
      </thead>
      <tbody class='xm:text-xs sm:text-sm text-center'>
        {data.map(sched => sched.courses.map((course, index) =>
          <GeneratePrintRow course={course} key={index} sched={sched}/>
        ))}
      </tbody>
    </table>
  )
}

export default GeneratePrintTable;