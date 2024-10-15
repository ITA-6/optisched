import React, { useState } from "react";
import { data } from "./ccsCurriculum";
import CurriculumSubjectForm from "./CurriculumSubjectForm";
import { useLocation } from "react-router-dom";
import CurriculumSemesterForm from "./CurriculumSemesterForm";
const CourseTable = () => {
  const [subjectFormOpen, setSubjectFormOpen] = useState(false)
  const [semesterForm, setSemesterFormOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleSemesterForm = () => {
    setSemesterFormOpen(!semesterForm)
  }

  const toggleSubjectForm = () =>{
    setSubjectFormOpen(!subjectFormOpen)

    
  }

  const location = useLocation();
  const { acronym } = location.state || {}; // Get the acronym from state
  const selectedDepartment = data.filter(data => data.acronym === acronym )
  return (
    <div className="flex h-screen">
      <div className="w-64"></div>{" "}
      <div className="container mx-auto px-4 py-6">
        <div className="ml-8 rounded p-4">
          {" "}
          <h2 className="mb-4 mt-8 text-center text-xl font-bold">
            CURRICULUM
          </h2>
          <div className="flex ">
              <div className="flex flex-1 justify-between ">
                <h3 className="mb-2 mt-8 text-lg font-semibold">First Year</h3>
                <h3 className="mb-2 mt-8 text-lg font-semibold">Second Semester</h3>
              </div>
            <div 
              className="flex items-center text-3xl font-bold mt-5 ml-5"
              onClick={toggleModal}
              >
                -</div>
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
                  <th className="border border-gray-400 p-2 text-sm text-white">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedDepartment.map((subject)=> (
                  subject.firstYear.firstSemester.subject.map((subject,index) => (  
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
                        <div className="flex justify-center items-center gap-5">
                          <button type="button">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          {/* Second Semester */}
          <div className="flex ">
              <div className="flex flex-1 justify-between ">
                <h3 className="mb-2 mt-8 text-lg font-semibold">First Year</h3>
                <h3 className="mb-2 mt-8 text-lg font-semibold">Second Semester</h3>
              </div>
            <div 
              className=" flex items-center text-3xl font-bold mt-5 ml-5"
              onClick={toggleModal}    
            >-</div>
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
                  <th className="border border-gray-400 p-2 text-sm text-white">
    
                  </th>
                </tr>
              </thead>
              <tbody>

                {selectedDepartment.map((subject)=> (
                  subject.firstYear.secondSemester.subject.map((subject,index) => (
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
                        <div className="flex justify-center items-center gap-5">
                          <button type="button">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center mt-5 gap-10">
              <button 
                type="button" 
                className="bg-green text-white text-base px-5 py-2 rounded-md"
                onClick={toggleSemesterForm}
              >
                  Add New Semester</button>
              <button 
                type="button" 
                className="bg-green text-white text-base px-5 py-2 rounded-md"
                onClick={toggleSubjectForm}
              >
                  Add New Subject</button>
          </div>

          {subjectFormOpen && (
            <CurriculumSubjectForm  toggleSubjectForm={toggleSubjectForm} data={data} acronym={acronym}/>
          )}

          {semesterForm && (
            <CurriculumSemesterForm  toggleSemesterForm={toggleSemesterForm}/>
          )}

          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
              <div className="w-[20rem] h-[10rem] flex flex-col justify-center items-center bg-white rounded-md">
                <div className=" mb-3 h-1/3 flex text-md font-medium items-center text-center px-10">
                  <h1>
                    Are you sure? you want to delete this item?
                    </h1>
                </div>
                <div 
                  className="flex gap-4"
                >
                  <button 
                    className=" bg-green text-white  py-2 px-10 text-center"
                    onClick={toggleModal}
                    >
                      Yes
                  </button>
                  <button
                    className="py-2 px-10 bg-red-500 text-white"
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
