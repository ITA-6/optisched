import React, { useState } from "react";

const PasswordChange = ({ handleChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  const validatePassword = () => {
    const errors = [];
    let fulfilledCriteria = 0;

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(newPassword)) {
      errors.push("At least 1 uppercase");
    } else {
      fulfilledCriteria++;
    }

    // Check for at least one number
    if (!/\d/.test(newPassword)) {
      errors.push("At least 1 number");
    } else {
      fulfilledCriteria++;
    }

    // Check for at least 8 characters
    if (newPassword.length < 8) {
      errors.push("At least 8 characters");
    } else {
      fulfilledCriteria++;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    // Update password strength
    if (fulfilledCriteria === 3) {
      setPasswordStrength("Strong");
    } else if (fulfilledCriteria === 2) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Add your password change logic here
      console.log("Password updated successfully");
    }
  };

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

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Validation Errors */}
          <div>
            <p
              className={`font-medium mb-2 ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
            <ul className="text-gray-600 text-sm space-y-1">
              {["At least 1 uppercase", "At least 1 number", "At least 8 characters", "Passwords do not match"].map(
                (criteria) => (
                  <li
                    key={criteria}
                    className={`flex items-center ${
                      validationErrors.includes(criteria)
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    <span className="mr-2">
                      {validationErrors.includes(criteria) ? "✗" : "✓"}
                    </span>
                    {criteria}
                  </li>
                )
              )}
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
