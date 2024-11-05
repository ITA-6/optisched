import React from 'react'
import GenerateTableRow from './GenerateTableRow'

const GenerateTable = ({schedules}) => {
  return (
    <table className=" table-auto h-full">
      <thead className="bg-green">
        <tr className='text-white text-xs '>
          <th className='p-1 w-64'>Course Code</th>
          <th className='w-64'>Course Description</th>
          <th className='w-64'>Lec Units</th>
          <th className='w-64'>Lab Units</th>
          <th className='w-64'>Day</th>
          <th className='w-64'>Time</th>
          <th className='w-64'>Room</th>
          <th className='w-64'>Section</th>
        </tr>
      </thead>
      <tbody>
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