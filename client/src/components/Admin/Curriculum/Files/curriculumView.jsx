import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurriculumSubjectForm from "./CurriculumSubjectForm";
import CurriculumTable from "./CurriculumTable";

import api from "../../../../api";

const CurriculumView = () => {
  const location = useLocation();
  const [curriculums, setCurriculums] = useState([]);
  const [subjectForm, setSubjectForm] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [errors, setError] = useState();
  const [errorMessage, setErrorMessage] = useState([]);
  const [course, setCourse] = useState();

  useEffect(() => {
    const fetchCurriculums = async () => {
      const response = await api(`curriculum/?program_id=${location.state.id}`);
      const course = await api("courses/");
      setCourse(course.data);
      setCurriculums(response.data);
    };

    fetchCurriculums();
  }, []);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  const toggleSubjectForm = () => {
    setSubjectForm(!subjectForm);
  };

  const submitSubject = async (subject) => {
    try {
      const response = await api(`curriculum/?program_id=${location.state.id}`);
      setCurriculums(response.data);
      setIsModalOpen(false);
    } catch (error) {
      // Show the error message for 5 seconds
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const UpdateCurriculum = async (professor) => {
    try {
      const response = await api(`curriculum/?program_id=${location.state.id}`);
      setCurriculums(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row md:px-4">
      <div className="flex w-full flex-col pb-16 pt-6 sm:px-0 sm:pt-20 lg:px-4 xm:pt-10">
        <h2 className="mb-4 mt-8 text-center text-xl font-bold sm:text-sm xm:px-20 xm:text-xs">
          CURRICULUM
        </h2>
        <div className="w-full">
          {curriculums?.map((curriculum, index) => (
            <CurriculumTable key={index} curriculum={curriculum} />
          ))}
        </div>
        <div className="flex items-center justify-end pb-14 pt-5">
          <button
            className="rounded-xl bg-green px-5 py-2 font-medium text-white"
            onClick={toggleSubjectForm}
          >
            ADD SUBJECT
          </button>
        </div>
        {subjectForm && (
          <CurriculumSubjectForm
            toggleSubjectForm={toggleSubjectForm}
            initialData={initialData}
            handler={initialData ? UpdateCurriculum : submitSubject}
            course={course}
          />
        )}
      </div>
    </div>
  );
};

export default CurriculumView;
