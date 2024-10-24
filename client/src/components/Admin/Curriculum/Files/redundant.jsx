import React, { useEffect, useState } from "react";
import CurriculumSubjectForm from "./CurriculumSubjectForm";
import { useLocation } from "react-router-dom";
import CurriculumSemesterForm from "./CurriculumSemesterForm";
import api from "../../../../api";

const CourseTable = () => {
  const [subjectFormOpen, setSubjectFormOpen] = useState(false);
  const [semesterForm, setSemesterFormOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const [curriculum, setCurriculum] = useState([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleSemesterForm = () => {
    setSemesterFormOpen(!semesterForm);
  };

  const toggleSubjectForm = () => {
    setSubjectFormOpen(!subjectFormOpen);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64"></div>{" "}
      <div className="container mx-auto px-4 py-6">
        <div className="ml-8 rounded p-4">
          {" "}
          <h2 className="mb-4 mt-8 text-center text-xl font-bold">
            CURRICULUM
          </h2>
          <div className="flex">
            <div className="flex flex-1 justify-between">
              <h3 className="mb-2 mt-8 text-lg font-semibold">First Year</h3>
              <h3 className="mb-2 mt-8 text-lg font-semibold">
                Second Semester
              </h3>
            </div>
            <div
              className="ml-5 mt-5 flex items-center text-3xl font-bold"
              onClick={toggleModal}
            >
              -
            </div>
          </div>
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
                  <th className="border border-gray-400 p-2 text-sm text-white"></th>
                </tr>
              </thead>
              <tbody>
                {curriculum?.map((subject) =>
                  subject.firstYear.firstSemester.subject.map(
                    (subject, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.code}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.title}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.lec}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.lab}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.total}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.pre}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          <div className="flex items-center justify-center gap-5">
                            <button type="button">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ),
                  ),
                )}
              </tbody>
            </table>
          </div>
          {/* Second Semester */}
          <div className="flex">
            <div className="flex flex-1 justify-between">
              <h3 className="mb-2 mt-8 text-lg font-semibold">First Year</h3>
              <h3 className="mb-2 mt-8 text-lg font-semibold">
                Second Semester
              </h3>
            </div>
            <div
              className="ml-5 mt-5 flex items-center text-3xl font-bold"
              onClick={toggleModal}
            >
              -
            </div>
          </div>
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
                  <th className="border border-gray-400 p-2 text-sm text-white"></th>
                </tr>
              </thead>
              <tbody>
                {selectedDepartment.map((subject) =>
                  subject.firstYear.secondSemester.subject.map(
                    (subject, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.code}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.title}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.lec}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.lab}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.total}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          {subject.pre}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm">
                          <div className="flex items-center justify-center gap-5">
                            <button type="button">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ),
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex items-center justify-end gap-10">
            <button
              type="button"
              className="rounded-md bg-green px-5 py-2 text-base text-white"
              onClick={toggleSemesterForm}
            >
              Add New Semester
            </button>
            <button
              type="button"
              className="rounded-md bg-green px-5 py-2 text-base text-white"
              onClick={toggleSubjectForm}
            >
              Add New Subject
            </button>
          </div>
          {subjectFormOpen && (
            <CurriculumSubjectForm
              toggleSubjectForm={toggleSubjectForm}
              data={data}
              acronym={acronym}
            />
          )}
          {semesterForm && (
            <CurriculumSemesterForm toggleSemesterForm={toggleSemesterForm} />
          )}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="flex h-[10rem] w-[20rem] flex-col items-center justify-center rounded-md bg-white">
                <div className="text-md mb-3 flex h-1/3 items-center px-10 text-center font-medium">
                  <h1>Are you sure? you want to delete this item?</h1>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-green px-10 py-2 text-center text-white"
                    onClick={toggleModal}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-red-500 px-10 py-2 text-white"
                    onClick={toggleModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
