import user from "../../../../assets/user.png";

import { useState, useEffect } from "react";

const UserForm = ({ toggleModal, handler, initialData, departments, errorMessage, errors }) => {
  const [professorId, setProfessorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  console.log(errorMessage.user_id)
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

    console.log(userData);
    if (initialData) userData.id = initialData.id;
    handler(userData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:overflow-auto xm:overflow-auto">
      <div className="relative w-2/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img
            src={user}
            alt=""
            className="m-3 mr-4 h-[30px] w-[30px] sm:h-[1.7em] sm:w-[1.7em] md:h-[2em] md:w-[2em] xm:h-[1.5em] xm:w-[1.5em]"
          />
          <h2 className="ml-2 text-3xl font-extrabold text-white sm:ml-0 sm:text-lg md:text-xl xm:ml-0 xm:text-sm">
            Create New User
          </h2>
        </div>
        <div className="p-5">
          <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
            {/* User ID */}
            <div className="flex flex-col">
              <label
                htmlFor="mail"
                className="text-lg font-medium text-gray-700 sm:text-sm md:text-base xm:text-xs"
              >
                Professor ID
                <span className={`${errorMessage.user_id && errors ? "inline" : "hidden"} text-sm text-red-500 ml-2`}> * Professor ID is Taken</span>
              </label>
              <input
                type="number"
                id="professorID"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:p-1 md:text-base xm:p-1 xm:text-xs"
                value={professorId}
                onChange={(e) => setProfessorId(e.target.value)}
                required
              />
            </div>
            {/* Role Field */}
            <div className="flex flex-col sm:text-sm md:text-base xm:text-xs">
              <label
                htmlFor="role"
                className="text-lg font-medium text-gray-700 sm:text-sm md:text-base xm:text-xs"
              >
                Role
                <span className={`${errorMessage.user_type && errors ? "inline" : "hidden"} text-sm text-red-500 ml-2`}> * Please Select a  valid Role</span>
              </label>
              <select
                name="role"
                id="role"
                className="rounded-md border border-gray-300 p-2 sm:p-1 md:p-2 xm:rounded-md xm:p-1"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="DC">Department Chair</option>
                <option value="D">Dean</option>
                <option value="R">Registrar</option>
                <option value="VPAA">
                  Vice President for Academic Affairs
                </option>
              </select>
            </div>

            {/* Name Fields */}
            <div className="flex flex-col sm:text-sm md:text-base xm:text-xs">
              <label className="text-lg font-medium text-gray-700 sm:text-sm md:text-base xm:text-xs">
                Name
              </label>
              <div className="mt-2 flex sm:flex-col sm:gap-4 md:flex-row xm:flex-col xm:gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-600 sm:text-sm md:text-base xm:text-xs"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:p-1 xm:p-1"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="middlename"
                    className="block text-sm font-medium text-gray-600 sm:text-sm md:text-base xm:text-xs"
                  >
                    Middlename
                  </label>
                  <input
                    type="text"
                    id="middlename"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:p-1 xm:p-1"
                    onChange={(e) => setMiddleName(e.target.value)}
                    value={middleName}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-600 sm:text-sm md:text-base xm:text-xs"
                  >
                    Lastname
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:p-1 xm:p-1"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Address Field */}
            <div className="flex flex-col sm:text-sm md:text-base xm:text-xs">
              <label
                htmlFor="mail"
                className="text-lg font-medium text-gray-700 sm:text-sm md:text-base xm:text-xs"
              >
                Email Address
                <span className={`${errorMessage.email && errors ? "inline" : "hidden"} text-sm text-red-500 ml-2`}> * Email is Taken</span>
              </label>
              <input
                type="email"
                id="mail"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:p-1 sm:text-sm md:text-base xm:p-1 xm:text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Birthdate */}
            <div className="grid flex-1 sm:text-sm md:text-base xm:text-xs">
              <label
                htmlFor="birthdate"
                className="text-lg font-medium text-gray-700 sm:text-sm md:text-base xm:text-xs"
              >
                Birthdate
              </label>
              <input
                className="rounded-md border border-gray-300 p-2 sm:p-1 xm:p-1"
                type="date"
                name="birthdate"
                id="birthdate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            {role === "VPAA" || role === "R" ? null : (
              <div className="flex flex-col xm:text-xs">
                <label
                  htmlFor="department"
                  className="text-lg font-medium text-gray-700 sm:text-sm md:text-base xm:text-xs"
                >
                  Department
                </label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:p-1 sm:text-sm md:text-base xm:p-1 xm:text-xs"
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
              <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl bg-green xm:w-28">
                <span className="text-white xm:text-xs">Confirm</span>
              </button>
            </div>
          </form>
          <button
            className="absolute right-4 top-4 rounded-full bg-red-500 px-2 text-white"
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
