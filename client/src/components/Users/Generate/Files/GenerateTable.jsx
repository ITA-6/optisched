import React from 'react'

const GenerateTable = () => {
  return (
    <table className="h-full w-full">
      <thead className="bg-green">
        <tr className='text-white text-xs '>
          <th className='p-1 w-64'>Course Code</th>
          <th className='w-64'>Course Description</th>
          <th className='w-64'>Lec Units</th>
          <th className='w-64'>Lab Units</th>
          <th className='w-64'>Day</th>
          <th className='w-64'>Time</th>
          <th className='w-64'>Room</th>
          <th className='w-64'>Units</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

export default GenerateTable