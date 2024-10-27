import React from 'react'
import { useState, useEffect } from 'react';
import api from "../../../../api";
const CurriculumSubjectForm = ({toggleSubjectForm, data, acronym}) => {
  const [subjects, setSubject] = useState([]);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api("courses/");
      setCourses(response.data);
      
    };
    fetchData();
  }, []);

 
  const submitBtn = (e) => {
    e.preventDefault();
    const selectedProgram = data.findIndex( data => data.acronym === acronym)
    const selectedSubject = course.filter(subject => subject.code === subjects)


    data[selectedProgram][year][semester].subject.push({code : selectedSubject[0].code, title : selectedSubject[0].name, total : selectedSubject[0].total_hours, lab : (selectedSubject[0].category === "LABORATORY") ? 0 : 3, lec : (selectedSubject[0].category === "LECTURE") ? 0 : 3, pre : "None" })
   
    toggleSubjectForm();
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/3 rounded-lg bg-white shadow-lg">
        <div className="flex h-[10*] items-center justify-center bg-green">
          <img src=""  alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold text-white">
            Add New Subject
          </h2>
        </div>

        <form action="" className="flex flex-col gap-6 my-10 text-base">
          <div className="flex flex-col gap-10 mx-10">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="first_year">Select Year</label>
              <select 
                name="year"
                id="year"
                className='border border-gray-300 p-1 rounded-md'
                onChange={(e) => setYear(e.target.value)}
               >
                <option value="">Select Year</option>
                <option value="firstYear">First Year</option>
                <option value="secondYear">Second Year</option>
                <option value="thirdYear">Third Year</option>
                <option value="fourthYear">Fourth Year</option>
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="subject">Select Subject</label>
              <select 
                  name="subject"
                  id="subject"
                  className='border border-gray-300 p-1 rounded-md'
                  onChange={(e) => setSubject(e.target.value)}
                 >
                  <option value="">
                      Select Subject
                  </option>
                {course.map(courses => (
                   <option value={courses.code} key={courses.id}>{courses.code}</option>
                ))}
                 </select>
               
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="semester">Select Year</label>
              <select
                name="semester"
                id="semester"
                className='border border-gray-300 p-1 rounded-md'
                onChange={(e) => setSemester(e.target.value)}
                >
                <option value="">Select Semester</option>
                <option value="firstSemester">First Semester</option>
                <option value="secondSemester">Second Semester</option>

              </select>
            </div>
          </div>
          <div className="flex justify-end items-center mr-14">
            <button 
              type="submit"
              className="bg-green text-white px-5 py-2 rounded-md"
              onClick={submitBtn}
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
  )
}

export default CurriculumSubjectForm