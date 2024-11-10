import { useState, useEffect } from "react";
import course from "../../../../../assets/course.png";

const ProgramForms = ({
  toggleModal,
  handler,
  initialData,
  departments,
  errorMessage,
}) => {
  const [program, setProgram] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (initialData) {
      setProgram(initialData.name || "");
      setDepartment(initialData.department || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const programData = {
      name: program,
      department: department,
    };
    if (initialData) programData.id = initialData.id;
    handler(programData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
            {initialData ? "Update Program" : "Create New Program"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            {/* Program Name Field with Error Handling */}
            <div className="flex flex-1 flex-col">
              <label htmlFor="programName" className="text-lg font-medium">
                Program Name
              </label>
              <input
                type="text"
                id="programName"
                name="programName"
                placeholder="Program Name"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className={`rounded-md border p-2 ${errorMessage?.name ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errorMessage?.name && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.name[0]}
                </span>
              )}
            </div>

            {/* Department Select Field with Error Handling */}
            <div className="flex flex-1 flex-col">
              <label htmlFor="departmentName" className="text-lg font-medium">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`w-full rounded-md border p-2 ${errorMessage?.department ? "border-red-500" : "border-gray-300"}`}
                required
              >
                <option disabled value="">
                  Select Department
                </option>
                {departments?.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              {errorMessage?.department && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.department[0]}
                </span>
              )}
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

export default ProgramForms;
