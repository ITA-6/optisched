import React from 'react'
import UserRow from './UserRow'

const UserTable = ({data, toggleModal}) => {
  return (
    <table className="table-fixed bg-white grid-in-table">
        <thead className="bg-green text-white text-xs">
            <tr>
                <th scope="col" className=' p-2'>User ID</th>
                <th scope="col" className=''>Name</th>
                <th scope="col" className=''>Gender</th>
                <th scope="col" className=''>Email Address</th>
                <th scope="col" className=''>Phone Number</th>   
                <th scope="col" className=''>Department</th>
                <th scope="col" className=''>Type of User</th>
                <th scope="col" className=''>Status</th>
                <th scope="col" className=''></th>
            </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto border-collapse border-y-2 border-gray-200 text-sm">
            {data.map((item) => (
                <UserRow item={item} toggleModal={toggleModal} />
                ))}
        </tbody>
    </table>
  )
}

export default UserTable