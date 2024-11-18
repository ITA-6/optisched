import { useState, useEffect } from "react";
import api from "../../api";

const PasswordChange = ({ handleChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [notification, setNotification] = useState(null); // For success or error messages

  useEffect(() => {
    validatePassword();
  }, [newPassword, confirmPassword]);

  const validatePassword = () => {
    const errors = [];
    let fulfilledCriteria = 0;

    const criteria = [
      { check: /[A-Z]/.test(newPassword), message: "At least 1 uppercase" },
      { check: /\d/.test(newPassword), message: "At least 1 number" },
      { check: newPassword.length >= 8, message: "At least 8 characters" },
      {
        check: newPassword === confirmPassword,
        message: "Passwords do not match",
      },
    ];

    criteria.forEach((criterion) => {
      if (!criterion.check) {
        errors.push(criterion.message);
      } else if (criterion.message !== "Passwords do not match") {
        fulfilledCriteria++;
      }
    });

    // Update password strength dynamically
    if (fulfilledCriteria === 3) {
      setPasswordStrength("Strong");
    } else if (fulfilledCriteria === 2) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }

    // Disable submit button if there are errors
    setIsSubmitDisabled(errors.length > 0);
    setValidationErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validationErrors.length === 0) {
        const response = await api.put("account/change-password/", {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        });
        setNotification({
          type: "success",
          message: response.data.message,
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        handleChangePassword();
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again.";
      setNotification({ type: "error", message: errorMessage });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Dialog Header */}
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <button
            onClick={handleChangePassword}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✖
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`mb-4 rounded-lg p-3 text-sm ${
              notification.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Dialog Content */}
        <p className="mb-4 text-sm text-gray-600">
          Update password for enhanced account security.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Current Password */}
          <div>
            <label
              htmlFor="current-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Current Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="new-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              New Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm New Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Validation Errors */}
          <div>
            <p
              className={`mb-2 font-medium ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              {[...validationErrors].map((criteria) => (
                <li key={criteria} className="text-red-500">
                  ✗ {criteria}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleChangePassword}
              className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
                isSubmitDisabled
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
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
