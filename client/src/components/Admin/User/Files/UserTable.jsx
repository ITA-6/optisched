import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ filteredUsers, toggleModal, openUpdate, DeleteUser }) => {
  // Define rowsToDisplay with placeholders for missing data
  const rowsToDisplay = Array.from(
    { length: filteredUsers.length }, // Ensure at least 5 rows are displayed
    (_, index) => {
      return (
        filteredUsers[index] || {
          id: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          department: "",
          userType: "",
        }
      );
    },
  );

  return (
    <table className="w-full table-fixed bg-white">
      <thead className="sticky top-0 z-0 bg-green text-xs text-white sm:text-sm xm:font-medium">
        <tr>
          <th scope="col" className="p-2 py-[0.2em] sm:w-32 xm:w-32 xm:px-0">
            ID
          </th>
          <th scope="col" className="sm:w-32 xm:w-32">
            First Name
          </th>
          <th scope="col" className="sm:w-32 xm:w-32">
            Middle Name
          </th>
          <th scope="col" className="sm:w-32 xm:w-32">
            Last Name
          </th>
          <th scope="col" className="sm:w-56 xm:w-44">
            Email Address
          </th>
          <th scope="col" className="sm:w-56 xm:w-44">
            Department
          </th>
          <th scope="col" className="sm:w-32 xm:w-32">
            Type of User
          </th>
          <th scope="col" className="sm:w-48 xm:w-44"></th>
        </tr>
      </thead>
      <tbody className="mb-10 border-collapse overflow-auto border-y-2 border-gray-200 text-sm">
        {rowsToDisplay.map((user, index) => (
          <UserRow
            user={user}
            key={user.id || `placeholder-${index}`} // Unique key for placeholders
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
