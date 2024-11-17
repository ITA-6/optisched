import { useState, useEffect } from "react";
import course from "../../../../../assets/course.png";
import { faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseForm = ({ toggleModal, handler, initialData, courses }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [lectureUnits, setLectureUnits] = useState(0);
  const [lectureHours, setLectureHours] = useState(0);
  const [labUnits, setLabUnits] = useState(0);
  const [labHours, setLabHours] = useState(0);
  const [needMasteral, setNeedMasteral] = useState(false);
  const [isRequisiteOpen, setIsRequisiteOpen] = useState(false);
  // Effect to populate form fields if initialData is provided
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCode(initialData.code || "");
      setCategory(initialData.category || "");
      setLectureUnits(initialData.lecture_units|| 0);
      setLectureHours(initialData.lecture_hours || 0);
      setLabUnits(initialData.lab_units|| 0);
      setLabHours(initialData.lab_hours || 0);
      setNeedMasteral(initialData.need_masteral || false);
    }
  }, [initialData]);

  const toggleRequisiteForm = () => {
    setIsRequisiteOpen(!isRequisiteOpen);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      name,
      code,
      category,
      lecture_unit: +lectureUnits,
      lecture_hours: +lectureHours,
      lab_unit: +lectureUnits,
      lab_hours: +lectureHours,
      need_masteral: needMasteral,
    };

    console.log(courseData)
    if (initialData) courseData.id = initialData.id;
    handler(courseData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
        <FontAwesomeIcon
            className="m-3 mr-4 sm:h-[1.5em] sm:w-[1.7em] md:h-[2em] md:w-[2em] xm:h-[1.5em] xm:w-[1.5em] text-white"
            icon={faGraduationCap}
           />
          <h2 className="ml-2 text-3xl font-extrabold text-white sm:ml-0 sm:text-lg md:text-xl xm:ml-0 xm:text-sm">
            {initialData ? "Update Course" : "Create New Course"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            <div className="flex flex-1 flex-col">
              <label htmlFor="courseTitle" className="text-lg font-medium">
                Course Title *
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
                Course Code *
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
              <label htmlFor="courseType" className="text-lg font-medium">
                Course Type *
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
            <div
              className={`flex gap-10 ${category === "LECTURE" || category === "BOTH" ? "flex" : "hidden"}`}
            >
              <div className={`flex flex-1 flex-col`}>
                <label htmlFor="lecUnits" className="text-lg font-medium">
                  Lecture Units *
                </label>
                <input
                  type="number"
                  name="lecUnits"
                  id="lecUnits"
                  placeholder="Lecture Units"
                  value={lectureUnits}
                  onChange={(e) => setLectureUnits(e.target.value)}
                  className="rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className={`flex flex-1 flex-col`}>
                <label htmlFor="Lecture Hours" className="text-lg font-medium">
                  Lecture Hours *
                </label>
                <input
                  type="number"
                  name="lecHours"
                  id="lecHours"
                  placeholder="Lecture Hours"
                  value={lectureHours}
                  onChange={(e) => setLectureHours(e.target.value)}
                  className="rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
            </div>
            <div
              className={`flex-row gap-10 ${category === "LABORATORY" || category === "BOTH" ? "flex" : "hidden"}`}
            >
              <div className={`flex flex-1 flex-col`}>
                <label htmlFor="labUnits" className="text-lg font-medium">
                  Laboratory Units *
                </label>
                <input
                  type="number"
                  name="labUnits"
                  id="labUnits"
                  placeholder="Laboratory Units"
                  value={labUnits}
                  onChange={(e) => setLabUnits(e.target.value)}
                  className="rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className={`flex flex-1 flex-col`}>
                <label htmlFor="Lecture Hours" className="text-lg font-medium">
                  Laboratory Hours *
                </label>
                <input
                  type="number"
                  name="labHours"
                  id="labHours"
                  placeholder="Laboratory Hours"
                  value={labHours}
                  onChange={(e) => setLabHours(e.target.value)}
                  className="rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="needMasteral" className="text-lg font-medium">
                Need Masteral *
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
            {/* <div className="flex flex-col justify-start items-start gap-2">
                <label htmlFor="reqiusite">Choose Pre/Co-Requisite</label>
                <button type="button" className="border border-gray-300 py-1 px-10 rounded-md" onClick={toggleRequisiteForm}>Choose</button>
            </div> */}
             <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
              <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl bg-green xm:w-28">
                <span className="text-white xm:text-xs font-bold">Confirm</span>
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

      {isRequisiteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-50">
          <div className="relative w-2/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img
                src={course}
                alt="Course Icon"
                className="m-3 mr-4 h-[30px] w-[30px]"
              />
              <h2 className="ml-2 text-3xl font-extrabold">
                Select Pre/Co-Requisite
              </h2>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-5 p-10 text-base">
              {courses.map((subject) => (
                <div
                  className="flex justify-items-center gap-2"
                  key={subject.id}
                >
                  <input type="checkbox" name="requisite" id="requisite" />
                  <label htmlFor="requisite"> {subject.code}</label>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="mb-10 mr-10 rounded-md bg-green px-10 py-2 text-white"
              >
                Confirm
              </button>
            </div>
            <button
              className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
              onClick={toggleRequisiteForm}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseForm;
