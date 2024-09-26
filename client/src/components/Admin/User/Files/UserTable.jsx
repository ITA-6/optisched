import React from 'react'

const UserTable = () => {
  return (
    <table className="table-fixed bg-white grid-in-table">
        <thead className="bg-green">
            <tr>
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Department</th>
                <th scope="col">Type of User</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto">
            <tr className="h-[30px] text-center">
                <th scope="row">1</th>
                <td>John Doe</td>
                <td>Male</td>
                <td>johndoe2922@gmail.com</td>
                <td>21312323213</td>
                <td>CCS</td>
                <td>Dean</td>
                <td>Active</td>
                <td>
                    <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                        <button className="-h5 w-16 bg-green text-white">
                        {" "}
                        Edit
                        </button>
                        <button className="-h5 w-16 bg-red-500 text-white">
                        {" "}
                        Delete
                        </button>
                    </div>
                    </div>
                </td>
            </tr>
            <tr className="h-[30px] text-center">
                <th scope="row">2</th>
                <td>Jane Smith</td>
                <td>Female</td>
                <td>janesmith1234@gmail.com</td>
                <td>31231231231</td>
                <td>BSeD</td>
                <td>Professor</td>
                <td>Inactive</td>
                <td>
                    <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                        <button className="-h5 w-16 bg-green text-white">
                        {" "}
                        Edit
                        </button>
                        <button className="-h5 w-16 bg-red-500 text-white">
                        {" "}
                        Delete
                        </button>
                    </div>
                    </div>
                </td>
                </tr>
                <tr className="h-[30px] text-center">
                <th scope="row">3</th>
                <td>Michael Johnson</td>
                <td>Male</td>
                <td>michaeljohnson5678@gmail.com</td>
                <td>42342342342</td>
                <td>CoE</td>
                <td>Registrar</td>
                <td>Active</td>
                <td>
                    <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                        <button className="-h5 w-16 bg-green text-white">
                        {" "}
                        Edit
                        </button>
                        <button className="-h5 w-16 bg-red-500 text-white">
                        {" "}
                        Delete
                        </button>
                    </div>
                    </div>
                </td>
            </tr>
                <tr className="h-[30px] text-center">
                <th scope="row">4</th>
                <td>Emily Davis</td>
                <td>Female</td>
                <td>emilydavis9012@gmail.com</td>
                <td>53453453453</td>
                <td>BSBA</td>
                <td>Department Chair</td>
                <td>Inactive</td>
                <td>
                    <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                        <button className="-h5 w-16 bg-green text-white">
                        {" "}
                        Edit
                        </button>
                        <button className="-h5 w-16 bg-red-500 text-white">
                        {" "}
                        Delete
                        </button>
                    </div>
                    </div>
                </td>
            </tr>
            <tr className="h-[30px] text-center">
                <th scope="row">5</th>
                <td>Daniel Brown</td>
                <td>Male</td>
                <td>danielbrown3456@gmail.com</td>
                <td>64564564564</td>
                <td>CCS</td>
                <td>Dean</td>
                <td>Active</td>
                <td>
                    <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                        <button className="-h5 w-16 bg-green text-white">
                        {" "}
                        Edit
                        </button>
                        <button className="-h5 w-16 bg-red-500 text-white">
                        {" "}
                        Delete
                        </button>
                    </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
  )
}

export default UserTable