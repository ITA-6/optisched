import { useState, useEffect } from "react";
import course from "../../../../../assets/course.png";

const CourseForm = ({ closeModal, handler, initialData }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [needMasteral, setNeedMasteral] = useState(false);

  // Effect to populate form fields if initialData is provided
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCode(initialData.code || "");
      setCategory(initialData.category || "");
      setTotalUnits(initialData.total_units || 0);
      setTotalHours(initialData.total_hours || 0);
      setNeedMasteral(initialData.need_masteral || false);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      name,
      code,
      category,
      total_units: totalUnits,
      total_hours: totalHours,
      need_masteral: needMasteral,
    };
    if (initialData) courseData.id = initialData.id;
    handler(courseData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img
            src={course}
            alt="Course Icon"
            className="m-3 mr-4 h-[30px] w-[30px]"
          />
          <h2 className="ml-2 text-3xl font-extrabold">
            {initialData ? "Update Course" : "Create New Course"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            <div className="flex flex-1 flex-col">
              <label htmlFor="courseTitle" className="text-lg font-medium">
                Course Title
              </label>
              <input
                type="text"
                id="courseTitle"
                name="courseTitle"
                placeholder="Course Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="courseCode" className="text-lg font-medium">
                Course Code
              </label>
              <input
                type="text"
                name="courseCode"
                id="courseCode"
                placeholder="Course Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="totalUnits" className="text-lg font-medium">
                Total Units
              </label>
              <input
                type="number"
                name="totalUnits"
                id="totalUnits"
                placeholder="Total Units"
                value={totalUnits}
                onChange={(e) => setTotalUnits(Number(e.target.value))}
                className="rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="totalHours" className="text-lg font-medium">
                Total Hours
              </label>
              <input
                type="number"
                name="totalHours"
                id="totalHours"
                placeholder="Total Hours"
                value={totalHours}
                onChange={(e) => setTotalHours(Number(e.target.value))}
                className="rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="needMasteral" className="text-lg font-medium">
                Need Masteral
              </label>
              <select
                name="needMasteral"
                id="needMasteral"
                value={needMasteral}
                onChange={(e) => setNeedMasteral(e.target.value === "true")}
                className="rounded-md border border-gray-300 p-2"
                required
              >
                <option disabled value="">
                  Select If Need Masteral
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="courseType" className="text-lg font-medium">
                Course Type
              </label>
              <select
                name="courseType"
                id="courseType"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
                required
              >
                <option disabled value="">
                  Select Course Type
                </option>
                <option value="LECTURE">Lecture</option>
                <option value="LABORATORY">Laboratory</option>
                <option value="BOTH">Laboratory & Lecture</option>
              </select>
            </div>
            <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
              <button
                type="submit"
                className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl border-2 border-black bg-green"
              >
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

export default CourseForm;
