import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, toggleModal, openUpdate, DeleteUser }) => {
  console.log(users);

  return (
    <table className="table-fixed bg-white grid-in-table">
      <thead className="z-0 bg-green text-xs text-white sticky top-0">
        <tr>
          <th scope="col" className="p-2">
            ID
          </th>
          <th scope="col" className="">
            First Name
          </th>
          <th scope="col" className="">
            Middle Name
          </th>
          <th scope="col" className="">
            Last Name
          </th>
          <th scope="col" className="">
            Email Address
          </th>
          <th scope="col" className="">
            Department
          </th>
          <th scope="col" className="">
            Type of User
          </th>
          <th scope="col" className=""></th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full border-collapse overflow-auto border-y-2 border-gray-200 text-sm">
        {users?.map((user) => (
          <UserRow
            user={user}
            key={user.username}
            toggleModal={toggleModal}
            openUpdate={openUpdate}
            DeleteUser={DeleteUser}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
