import user from "../../../../../assets/user.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ProfessorForm = ({
  toggleModal,
  handler,
  initialData,
  errors,
  errorMessage,
  course,
}) => {
  const [professorId, setProfessorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasMasteral, setHasMasteral] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [specialization, setSpecialization] = useState([]); // Holds selected specializations
  const [specializationCount, setSpecializationCount] = useState(0); // Count of specializations
  const [activeSpecialization, setActiveSpecialization] = useState("");
  // Populate form fields with initial data
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
      setSpecialization(initialData.specialization || ["", "", ""]);
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
      course_specialization: specialization,
    };
    console.log(professorData);
    if (initialData) professorData.id = initialData.id;
    handler(professorData);
  };

  const toggleActive = (count) => {
    setSpecializationCount(count); // Set the count for specialization
    setSpecialization(Array(count).fill("")); // Initialize specialization array
    setActiveSpecialization(true); // Activate specialization selection
  };

  const handleSpecializationCount = (count) => {
    setSpecializationCount(count); // Set the number of specialization dropdowns
    setSpecialization(Array(count).fill("")); // Initialize the specialization array
  };

  const handleSpecializationChange = (index, value) => {
    setSpecialization((prev) => {
      const updatedSpecialization = [...prev];
      updatedSpecialization[index] = value; // Update the value at the given index
      return updatedSpecialization;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <FontAwesomeIcon
            className="m-3 mr-4 text-white sm:h-[1.5em] sm:w-[1.7em] md:h-[2em] md:w-[2em] xm:h-[1.5em] xm:w-[1.5em]"
            icon={faUser}
          />
          <h2 className="ml-2 text-3xl font-extrabold text-white sm:ml-0 sm:text-lg md:text-xl xm:ml-0 xm:text-sm">
            {initialData ? "Update Professor" : "Create New Professor"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            {/* Professor ID */}
            <div className="flex flex-col">
              <label
                htmlFor="professorID"
                className="text-lg font-medium text-gray-700"
              >
                Professor ID *
                <span
                  className={`${
                    errorMessage.prof_id && errors ? "inline" : "hidden"
                  } ml-2 text-sm text-red-500`}
                >
                  {" "}
                  Professor ID is Taken
                </span>
              </label>
              <input
                type="number"
                id="professorID"
                value={professorId}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 7); // Ensure 7 digits max
                  setProfessorId(value);
                }}
                max={9999999}
                className={`mt-1 w-full rounded-lg border border-gray-300 p-1 focus:border-blue-500 focus:ring-blue-500 ${
                  errorMessage.prof_id && errors
                    ? "border-red-500 outline-none duration-300 ease-in-out"
                    : ""
                }`}
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
                    Firstname *
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-1 focus:border-blue-500 focus:ring-blue-500"
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
                    className="mt-1 w-full rounded-lg border border-gray-300 p-1 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Lastname *
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-1 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-lg font-medium text-gray-700"
              >
                Email Address *
                <span
                  className={`${
                    errors && errorMessage.email ? "inline" : "hidden"
                  } ml-2 text-sm text-red-500`}
                >
                  {" "}
                  Email is Taken
                </span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 w-full rounded-lg border border-gray-300 p-1 focus:border-blue-500 focus:ring-blue-500 ${
                  errors && errorMessage.email
                    ? "border-red-500 outline-none"
                    : ""
                }`}
                required
              />
            </div>

            {/* Specialization */}
            <div className="flex flex-col">
              <div className="flex w-full flex-col gap-4">
                {/* Count selection */}
                <label htmlFor="number" className="text-sm font-medium">
                  Number of Specialization
                </label>
                <select
                  name="count"
                  id="count"
                  className="flex-1 rounded-md border border-gray-300 p-1"
                  onChange={(e) =>
                    handleSpecializationCount(parseInt(e.target.value))
                  }
                >
                  <option value="">Select Count</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>

                <div className="flex flex-col">
                  {/* Specialization dropdowns */}
                  {specializationCount > 0 && (
                    <>
                      <p className="mb-2 ml-1 text-lg font-medium">
                        Specialization
                      </p>
                      <div className="flex w-full flex-row gap-4">
                        {Array.from(
                          { length: specializationCount },
                          (_, index) => (
                            <select
                              key={index}
                              name={`specialization-${index}`}
                              className="w-full flex-1 rounded-md border border-gray-300 p-1"
                              onChange={(e) =>
                                handleSpecializationChange(
                                  index,
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">Select Specialization</option>
                              {course.map((courses) => (
                                <option
                                  key={courses.id}
                                  value={courses.id}
                                  className=""
                                >
                                  {courses.name}
                                </option>
                              ))}
                            </select>
                          ),
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="flex gap-10">
              <div className="flex-1">
                <label
                  htmlFor="gender"
                  className="text-lg font-medium text-gray-700"
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-1 focus:border-blue-500 focus:ring-blue-500"
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
                  Birthdate *
                </label>
                <input
                  className="rounded-md border border-gray-300 p-1"
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              {/* Employment Status */}
              <div className="w-full flex-1">
                <label
                  htmlFor="employmentStatus"
                  className="text-lg font-medium text-gray-700"
                >
                  Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="employmentStatus"
                  id="employmentStatus"
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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

              {/* Masteral */}
              <div className="w-full flex-1">
                <label
                  htmlFor="masteral"
                  className="text-lg font-medium text-gray-700"
                >
                  Masteral <span className="text-red-500">*</span>
                </label>
                <select
                  id="masteral"
                  value={hasMasteral}
                  onChange={(e) => setHasMasteral(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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

            {/* Submit Button */}
            <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
              <button
                type="submit"
                className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl bg-green xm:w-28"
              >
                <span className="font-bold text-white xm:text-xs">Confirm</span>
              </button>
            </div>
          </form>

          <button
            className="absolute right-4 top-4 rounded-full bg-red-500 px-1 text-white"
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
