import React from 'react'

const DashboardRow = ({data}) => {
  return (
    <tr className="h-10 max-h-10">
      <th scope="row" className="border border-gray-200">{data?.name || ''}</th>
      <td className="border border-gray-200">{data?.lastSeen || ''}</td>
      <td className="border border-gray-200">{data?.firstSeen || ''}</td>
      <td className="border border-gray-200">{data?.department || ''}</td>
      <td className="border border-gray-200">{data?.count || ''}</td>
      <td className="border border-gray-200">{data?.lastSession || ''}</td>
  </tr>
  )
}

export default DashboardRow