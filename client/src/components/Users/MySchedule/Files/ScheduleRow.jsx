import React from 'react'

const ScheduleRow = ({timeSlot}) => {
  return (
    <tr className="bg-white h-[3.5rem] border-b">
        <td className="border ">{timeSlot}</td>
        <td className="border "></td>
        <td className="border "></td>
        <td className="border "></td>
        <td className="border "></td>
        <td className="border "></td>
        <td className="border "></td>
        <td className="border "></td>
  </tr>
  )
}

export default ScheduleRow