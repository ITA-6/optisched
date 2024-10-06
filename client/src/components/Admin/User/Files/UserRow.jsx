import React from 'react'

const UserRow = ({item, toggleModal}) => {
  return (
    <tr className="h-[30px] text-center" key={item.id}>
    <th scope="row" className='border-y-2 border-gray-200'>{item.id}</th>
    <td className='border-y-2 border-gray-200'>{item.name}</td>
    <td className='border-y-2 border-gray-200'>{item.gender}</td>
    <td className='border-y-2 border-gray-200'>{item.email}</td>
    <td className='border-y-2 border-gray-200'>{item.phone}</td>
    <td className='border-y-2 border-gray-200'>{item.department}</td>
    <td className='border-y-2 border-gray-200'>{item.role}</td>
    <td className='border-y-2 border-gray-200'>{item.status}</td>
    <td className='border-y-2 border-gray-200'>
    <div className="flex items-center justify-center">
        <div className="ml-5 flex gap-2">
          <button
          onClick={toggleModal}
          className="-h4 w-16 bg-green text-white"
          >
            Edit</button>
        <button className="-h5 w-16 bg-red-500 text-white">Delete</button>
        </div>
    </div>
    </td>
</tr>
  )
}

export default UserRow