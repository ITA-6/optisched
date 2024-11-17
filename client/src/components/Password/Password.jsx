import React from "react";

const PasswordChange = ({handleChangePassword}) => {
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      {/* Dialog Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <button
          onClick={handleChangePassword}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✖
        </button>
      </div>

      {/* Dialog Content */}
      <p className="text-gray-600 text-sm mb-4">
        Update password for enhanced account security.
      </p>

      <form className="space-y-4">
        {/* Current Password */}
        <div>
          <label
            htmlFor="current-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="current-password"
            className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="new-password"
            className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Strength */}
        <div>
          <p className="text-red-600 font-medium mb-2">
            Weak password. Must contain:
          </p>
          <ul className="text-gray-600 text-sm space-y-1">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#10004;</span> At
              least 1 uppercase
            </li>
            <li className="flex items-center">
              <span className="text-red-500 mr-2">&#10008;</span> At least
              1 number
            </li>
            <li className="flex items-center">
              <span className="text-red-500 mr-2">&#10008;</span> At least
              8 characters
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleChangePassword}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Apply Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default PasswordChange;
