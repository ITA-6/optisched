import React from 'react'

const ViewTableSchedule = () => {
  return (
    <table className="h-full table-auto w-full">
        <thead>
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
        <tr>
            <td>test</td>
        </tr>
        </tbody>
    </table>
  )
}

export default ViewTableSchedule