import React from "react";
import { useState, useEffect } from "react";
const CurriculumSubjectForm = ({
  toggleSubjectForm,
  initialData,
  handler,
  course,
  programId,
}) => {
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    if (initialData) {
      setYear(initialData.year_level || "");
      setSemester(initialData.semester || "");
      setSubject(initialData.courses || []);
    }
  }, [initialData]);

  const getSelectedCourse = (id) => {
    const selectedCourse = course.find((c) => c.id === +id);
    if (selectedCourse && !subject.some((s) => s.id === selectedCourse.id)) {
      setSubject((prevSubjects) => [...prevSubjects, selectedCourse]);
    } else {
      console.warn("Course already selected or not found");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !Array.isArray(subject)) {
      console.error("Invalid subject data");
      return;
    }
    console.log(e);

    const uniqueCourses = [...new Set(subject.map((s) => s.id))]; // Ensure unique IDs

    const curriculumData = {
      program: programId, // Use program ID passed as a prop
      year_level: year, // Selected year level
      semester: semester, // Selected semester
      courses: uniqueCourses, // Array of course IDs
    };

    if (initialData?.id) {
      curriculumData.id = initialData.id; // Add id for update operation
    }

    console.log("Submitting Curriculum Data:", curriculumData);
    handler(curriculumData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/3 rounded-lg bg-white shadow-lg">
        <div className="flex h-[10*] items-center justify-center bg-green">
          <img src="" alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold text-white">
            Add New Subject
          </h2>
        </div>

        <form action="" className="my-10 flex flex-col gap-6 text-base">
          <div className="mx-10 flex flex-col gap-10">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="first_year">Select Year</label>
              <select
                name="year"
                id="year"
                className="rounded-md border border-gray-300 p-1"
                onChange={(e) => setYear(Number(e.target.value))} // Convert to number explicitly
              >
                <option value="">Select Year</option>
                <option value={1}>First Year</option>
                <option value={2}>Second Year</option>
                <option value={3}>Third Year</option>
                <option value={4}>Fourth Year</option>
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="subject">Select Subject</label>
              <select
                name="subject"
                id="subject"
                className="rounded-md border border-gray-300 p-1"
                onChange={(e) => getSelectedCourse(e.target.value)}
              >
                <option value="">Select Subject</option>
                {course && course.length > 0 ? (
                  course.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code}
                    </option>
                  ))
                ) : (
                  <option value="">No subjects available</option>
                )}
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="semester">Select Semester</label>
              <select
                name="semester"
                id="semester"
                className="rounded-md border border-gray-300 p-1"
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Select Semester</option>
                <option value="FIRST SEMESTER">First Semester</option>
                <option value="SECOND SEMESTER">Second Semester</option>
              </select>
            </div>
          </div>
          <div className="mr-14 flex items-center justify-end">
            <button
              type="submit"
              className="rounded-md bg-green px-5 py-2 text-white"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </div>
        </form>
        <button
          className="absolute right-3 top-3 rounded-full bg-red-500 px-2 pb-1 text-white"
          onClick={toggleSubjectForm}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CurriculumSubjectForm;
