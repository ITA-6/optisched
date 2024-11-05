import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ user, toggleModal, openUpdate, DeleteUser }) => {

  return (
    <table className="table-fixed bg-white grid-in-table w-full ">
      <thead className="z-0 bg-green text-xs text-white sticky top-0 xm:font-medium sm:text-sm">
        <tr>
          <th scope="col" className="p-2 xm:px-0 py-[0.2em] xm:w-32 sm:w-32 ">
            ID
          </th>
          <th scope="col" className="xm:w-32 sm:w-32">
            First Name
          </th>
          <th scope="col" className="xm:w-32 sm:w-32">
            Middle Name
          </th>
          <th scope="col" className="xm:w-32 sm:w-32">
            Last Name
          </th>
          <th scope="col" className="xm:w-44 sm:w-56">
            Email Address
          </th>
          <th scope="col" className="xm:w-44 sm:w-56">
            Department
          </th>
          <th scope="col" className="xm:w-32 sm:w-32">
            Type of User
          </th>
          <th scope="col" className="xm:w-44 sm:w-48"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse overflow-auto border-y-2 border-gray-200 text-sm">
          {user.length > 0 ? (
            user.map( user => (
              <UserRow
              user={user}
              key={user.username}
              toggleModal={toggleModal}
              openUpdate={openUpdate}
              DeleteUser={DeleteUser}
              />
            ))
          ) : (
            <tr className="">
              <td colSpan="7" className="text-center text-gray-300">
                No Data Yet
              </td>
            </tr>
          )}
      </tbody>
    </table>
  );
};

export default UserTable;
