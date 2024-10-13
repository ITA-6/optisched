import React from "react";
import { firstSemesterCourses, secondSemesterCourses } from "./ccsCurriculum";

const CourseTable = () => {
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
          <div className="max-h-[300px] overflow-x-auto overflow-y-auto">
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
          <div className="max-h-[300px] overflow-x-auto overflow-y-auto">
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
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
