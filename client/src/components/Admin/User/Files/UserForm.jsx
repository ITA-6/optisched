import React from "react";
import user from "../../../../assets/user.png";
const UserForm = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">Create New User</h2>
        </div>
        <div className="p-5">
          <form className="mt-5 space-y-6">
            {/* User ID */}
            <div className="flex flex-col">
              <label
                htmlFor="mail"
                className="text-lg font-medium text-gray-700"
              >
                Professor ID
              </label>
              <input
                type="number"
                id="professorID"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {/* Role Field */}
            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="text-lg font-medium text-gray-700"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                className="border border-gray-300 p-2"
              >
                <option value="casual">Registrar</option>
                <option value="casual">Department Chair</option>
                <option value="part-time">Dean</option>
                <option value="permanent">Professor</option>
                <option value="casual">
                  Vice President for Academic Affairs
                </option>
              </select>
            </div>

            {/* Name Fields */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">Name</label>
              <div className="mt-2 flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="middlename"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Middlename
                  </label>
                  <input
                    type="text"
                    id="middlename"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Lastname
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Address Field */}
            <div className="flex flex-col">
              <label
                htmlFor="mail"
                className="text-lg font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="mail"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Birthdate */}
            <div className="grid flex-1">
              <label
                htmlFor="birthdate"
                className="text-lg font-medium text-gray-700"
              >
                Birthdate
              </label>
              <input
                className="rounded-md border border-gray-300 p-2"
                type="date"
                name="birthdate"
                id="birthdate"
              />
            </div>

            {/* Department Field */}
            <div className="flex flex-col">
              <label
                htmlFor="department"
                className="text-lg font-medium text-gray-700"
              >
                Department
              </label>
              <select
                id="department"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="CCS">CCS</option>
                <option value="BSeD">BSeD</option>
                <option value="CoE">CoE</option>
                <option value="BSBA">BSBA</option>
              </select>
            </div>
            <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
              <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl border-2 border-black bg-green">
                <span>Confirm</span>
              </button>
            </div>
          </form>
          <button
            className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
