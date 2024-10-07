import user from "../../../../assets/user.png";

import { useState, useEffect } from "react";

const UserForm = ({ toggleModal, handler, initialData, departments }) => {
  const [professorId, setProfessorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  // Effect to populate form fields if initialData is provided
  useEffect(() => {
    if (initialData) {
      setProfessorId(initialData.username || "");
      setFirstName(initialData.first_name || "");
      setMiddleName(initialData.middle_name || "");
      setLastName(initialData.last_name || "");
      setRole(initialData.user_type || "");
      setBirthDate(initialData.birth_date || "");
      setEmail(initialData.email || "");
      setDepartment(initialData.department || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      professor_id: professorId,
      email: email,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      user_type: role,
      birth_date: birthDate,
      department: department,
    };
    if (initialData) userData.id = initialData.id;
    handler(userData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">Create New User</h2>
        </div>
        <div className="p-5">
          <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
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
                value={professorId}
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
                value={role}
              >
                <option value="R">Registrar</option>
                <option value="DC">Department Chair</option>
                <option value="D">Dean</option>
                <option value="P">Professor</option>
                <option value="VPAA">
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
                    value={firstName}
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
                    value={middleName}
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
                    value={lastName}
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
                value={email}
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
                value={birthDate}
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
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments?.map((department) => (
                  <>
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  </>
                ))}
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
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
