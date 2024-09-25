import { useState, useEffect } from "react";
import course from "../../../../../assets/course.png";

const DepartmentForm = ({ toggleModal, handler, initialData }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCode(initialData.acronym || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const departmentData = {
      name: name,
      acronym: code,
    };
    if (initialData) departmentData.id = initialData.id;
    handler(departmentData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
            {initialData ? "Update Department" : "Create New College"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            <div className="flex flex-1 flex-col">
              <label htmlFor="departmentName" className="text-lg font-medium">
                {" "}
                College Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                placeholder="Department Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="departmentCode" className="text-lg font-medium">
                {" "}
                College Code
              </label>
              <input
                type="text"
                id="departmentCode"
                name="departmentCode"
                placeholder="Department Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
                required
              />
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
export default DepartmentForm;
