import React from "react";

const UserRow = ({ user, openUpdate, DeleteUser }) => {
  return (
    <tr className="h-[4rem] text-center">
      <td className="border-y-2 border-gray-200">{user.username}</td>
      <td className="border-y-2 border-gray-200">{user.first_name}</td>
      <td className="border-y-2 border-gray-200">{user.middle_name}</td>
      <td className="border-y-2 border-gray-200">{user.last_name}</td>
      <td className="border-y-2 border-gray-200">{user.email}</td>
      <td className="border-y-2 border-gray-200">{user.department_name}</td>
      <td className="border-y-2 border-gray-200">{user.user_type_name}</td>
      <td className="border-y-2 border-gray-200">
        <div className="flex items-center justify-center">
          <div className="ml-5 flex gap-2">
            <button
              onClick={() => openUpdate(user)}
              className="-h4 w-16 bg-green text-white"
            >
              Edit
            </button>
            <button
              onClick={() => DeleteUser(user.username)}
              className="-h5 w-16 bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;