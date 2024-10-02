import React from 'react'

const UserTable = () => {
const data = [
    { id: 1, name: "John Doe", gender: "Male", email: "johndoe2922@gmail.com", phone: "21312323213", department: "CCS", role: "Dean", status: "Active" },
    { id: 2, name: "Jane Smith", gender: "Female", email: "janesmith1234@gmail.com", phone: "31231231231", department: "BSeD", role: "Professor", status: "Inactive" },
    { id: 3, name: "Michael Johnson", gender: "Male", email: "michaeljohnson5678@gmail.com", phone: "42342342342", department: "CoE", role: "Registrar", status: "Active" },
    { id: 4, name: "Emily Davis", gender: "Female", email: "emilydavis9012@gmail.com", phone: "53453453453", department: "BSBA", role: "Department Chair", status: "Inactive" },
    { id: 5, name: "Daniel Brown", gender: "Male", email: "danielbrown3456@gmail.com", phone: "64564564564", department: "CCS", role: "Dean", status: "Active" },
    ];
    


  return (
    <table className="table-fixed bg-white grid-in-table">
        <thead className="bg-green border-separate border-white text-white text-xs">
            <tr>
                <th scope="col" className='border border-white p-2'>User ID</th>
                <th scope="col" className='border border-white'>Name</th>
                <th scope="col" className='border border-white'>Gender</th>
                <th scope="col" className='border border-white'>Email Address</th>
                <th scope="col" className='border border-white'>Phone Number</th>   
                <th scope="col" className='border border-white'>Department</th>
                <th scope="col" className='border border-white'>Type of User</th>
                <th scope="col" className='border border-white'>Status</th>
                <th scope="col" className='border border-white'></th>
            </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto border-collapse border-gray-200 text-sm">
            {data.map((item) => (
                <tr className="h-[30px] text-center" key={item.id}>
                    <th scope="row" className='border border-gray-200'>{item.id}</th>
                    <td className='border border-gray-200'>{item.name}</td>
                    <td className='border border-gray-200'>{item.gender}</td>
                    <td className='border border-gray-200'>{item.email}</td>
                    <td className='border border-gray-200'>{item.phone}</td>
                    <td className='border border-gray-200'>{item.department}</td>
                    <td className='border border-gray-200'>{item.role}</td>
                    <td className='border border-gray-200'>{item.status}</td>
                    <td className='border border-gray-200'>
                    <div className="flex items-center justify-center">
                        <div className="ml-5 flex gap-2">
                        <button className="-h4 w-16 bg-green text-white">Edit</button>
                        <button className="-h5 w-16 bg-red-500 text-white">Delete</button>
                        </div>
                    </div>
                    </td>
                </tr>
                ))}
        </tbody>
    </table>
  )
}

export default UserTable