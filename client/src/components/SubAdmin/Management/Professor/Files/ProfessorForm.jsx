import user from "../../../../../assets/user.png";
import { useState, useEffect } from "react";
const ProfessorForm = ({ toggleModal, handler, departments, initialData, errors, errorMessage }) => {
  const [professorId, setProfessorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasMasteral, setHasMasteral] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");


  // Effect to populate form fields if initialData is provided
  useEffect(() => {
    if (initialData) {
      setProfessorId(initialData.prof_id || "");
      setFirstName(initialData.first_name || "");
      setMiddleName(initialData.middle_name || "");
      setLastName(initialData.last_name || "");
      setEmploymentStatus(initialData.employment_status || "");
      setHasMasteral(initialData.has_masteral || "");
      setBirthDate(initialData.birth_date || "");
      setEmail(initialData.email || "");
      setGender(initialData.gender || "O");
      setDepartment(initialData.department || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const professorData = {
      prof_id: professorId,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
      gender: gender,
      employment_status: employmentStatus,
      has_masteral: hasMasteral,
      birth_date: birthDate,
      department: department,
    };
    if (initialData) professorData.id = initialData.id;
    handler(professorData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
            {initialData ? "Update Professor" : "Create New Professor"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            {/* Professor ID */}
            <div className="flex flex-col">
              <label
                htmlFor="mail"
                className="text-lg font-medium text-gray-700"
              >
                Professor ID
                <span className={`${errorMessage.prof_id ? "inline" : "hidden"} text-sm text-red-500 ml-2`}> * Professor ID is Taken</span>
              </label>
              <input
                type="number"
                id="professorID"
                value={professorId}
                onChange={(e) => setProfessorId(e.target.value)}
                className={` mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 ${errorMessage.prof_id ? "outline-none border-red-500 ease-in-out duration-300" : ""}`}
                required
              />
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gender Field */}
            <div className="flex gap-10">
              <div className="flex-1">
                <label
                  htmlFor="gender"
                  className="text-lg font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
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
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </div>

            {/* Employment Status */}
            <div className="flex flex-col">
              <label
                htmlFor="employmentStatus"
                className="text-lg font-medium text-gray-700"
              >
                Employment Status
              </label>
              <select
                name="employmentStatus"
                id="employmentStatus"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
                required
              >
                <option value="" disabled>
                  Select Employment Status
                </option>
                <option value="CASUAL">Casual</option>
                <option value="PART_TIME">Part-time</option>
                <option value="PERMANENT">Permanent</option>
              </select>
            </div>

            {/* Email Address Field */}
            <div className="flex flex-col">
              <label
                htmlFor="mail"
                className="text-lg font-medium text-gray-700"
              >
                Email Address
                <span className={`${ errors && errorMessage.email ? "inline" : "hidden"} text-sm text-red-500 ml-2`}> * Email is Taken</span>
              </label>
              <input
                type="email"
                id="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 ${errors && errorMessage.email ? "outline-none border-red-500" : ""}`}
                required
              />
            </div>

            {/* Department Field */}
            <div className="flex gap-10">
              <div className="flex-1">
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
              {/* Masteral Field */}
              <div className="flex-1">
                <label
                  htmlFor="masteral"
                  className="text-lg font-medium text-gray-700"
                >
                  Masteral
                </label>
                <select
                  id="masteral"
                  value={hasMasteral}
                  onChange={(e) => setHasMasteral(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select If Has Masteral
                  </option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
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

export default ProfessorForm;
