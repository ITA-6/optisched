import React from 'react'
import GenerateTableRow from './GenerateTableRow'

const GenerateTable = ({schedules}) => {
  return (
    <table className=" h-full w-full xm:table-fixed sm:table-fixed lg:table-auto">
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
      <tbody className='xm:text-xs sm:text-sm'>
        {schedules.length > 0 ? (
            schedules.map(schedule => (
                <GenerateTableRow schedule={schedule} />
            ))
        ) : (
          <tr>
            <td colSpan="8" className='text-center '> No Data</td>
          </tr>
        )}
       
      </tbody>
    </table>
  )
}

export default GenerateTable