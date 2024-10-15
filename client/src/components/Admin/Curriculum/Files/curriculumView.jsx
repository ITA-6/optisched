import React, { useState } from "react";
import { firstSemesterCourses, secondSemesterCourses } from "./ccsCurriculum";
import CurriculumSubjectForm from "./CurriculumSubjectForm";
const CourseTable = () => {
  const [subjectFormOpen, setSubjectFormOpen] = useState(false)

  const toggleSubjectForm = () =>{
    setSubjectFormOpen(!subjectFormOpen)
  }
  return (
    <div className="flex">
      <div className="w-64"></div>{" "}
      <div className="container mx-auto px-4 py-6">
        <div className="ml-8 rounded p-4">
          {" "}
          <h2 className="mb-4 mt-8 text-center text-xl font-bold">
            CURRICULUM
          </h2>
          <h3 className="mb-2 text-lg font-semibold">First Semester</h3>
          <div className=" overflow-x-auto overflow-y-auto xl:max-h-[18.75rem] lg:max-h-[16rem] md: max-h-[12rem] ">
            {" "}
            <table className="mb-6 w-full table-auto border-collapse border border-gray-400">
              <thead className="bg-green">
                <tr>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Course Code
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Course Title
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Lec
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Lab
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Total
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Pre/Co-Requisite
                  </th>
                </tr>
              </thead>
              <tbody>
                {firstSemesterCourses.map((course, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.code}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.title}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.lec}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.lab}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.total}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.pre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Second Semester */}
          <h3 className="mb-2 mt-8 text-lg font-semibold">Second Semester</h3>
          <div className="overflow-x-auto overflow-y-auto xl:max-h-[18.75rem] lg:max-h-[16rem] md: max-h-[12rem]">
            {" "}
            <table className="w-full table-auto border-collapse border border-gray-400">
              <thead className="bg-green">
                <tr>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Course Code
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Course Title
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Lec
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Lab
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Total
                  </th>
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    Pre/Co-Requisite
                  </th>
                </tr>
              </thead>
              <tbody>
                {secondSemesterCourses.map((course, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.code}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.title}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.lec}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.lab}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.total}
                    </td>
                    <td className="border border-gray-400 p-2 text-sm">
                      {course.pre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center mt-5">
            <button type="button" className=" text-white text-base bg-green py-2 px-5 rounded-md"  onClick={toggleSubjectForm}>Add new Subject</button>
          </div>
        </div>
        {subjectFormOpen && (
            <CurriculumSubjectForm toggleSubjectForm={toggleSubjectForm} />
        )}
      </div>
    </div>
  );
};

export default CourseTable;
