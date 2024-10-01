import React from 'react'

const ScheduleRow = ({timeSlot}) => {
  return (
    <tr className="bg-white h-[3.5rem] border-b">
        <td className="border px-4 py-2">{timeSlot}</td>
        <td className="border px-4 py-2"></td>
        <td className="border px-4 py-2"></td>
        <td className="border px-4 py-2"></td>
        <td className="border px-4 py-2"></td>
        <td className="border px-4 py-2"></td>
        <td className="border px-4 py-2"></td>
        <td className="border px-4 py-2"></td>
  </tr>
  )
}

export default ScheduleRow