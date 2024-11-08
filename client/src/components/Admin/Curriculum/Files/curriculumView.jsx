import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurriculumSubjectForm from "./CurriculumSubjectForm";
import CurriculumTable from "./CurriculumTable";

import api from "../../../../api";

const CurriculumView = () => {
  const location = useLocation();
  const [curriculums, setCurriculums] = useState([]);
  const [subjectForm, setSubjectForm] = useState(false)
  
  useEffect(() => {
    const fetchCurriculums = async () => {
      const response = await api(`curriculum/?program_id=${location.state.id}`);
      setCurriculums(response.data);
    };

    fetchCurriculums();
  }, []);

  const toggleSubjectForm = () => {
    setSubjectForm(!subjectForm)
  }

  return (
    <div className="flex flex-row h-screen w-screen md:px-4">
        <div className="flex flex-col w-full pt-6 pb-16 xm:pt-10 sm:px-0 sm:pt-20 lg:px-4">
          <h2 className="mb-4 mt-8 text-center text-xl font-bold xm:text-xs xm:px-20 sm:text-sm">CURRICULUM</h2>
          <div className="w-full"> 
          {curriculums?.map((curriculum, index) => (
            <CurriculumTable key={index} curriculum={curriculum} />
          ))}
          </div>
          <div className="flex justify-end items-center pb-14 pt-5">
            <button 
              className="bg-green py-2 px-5 text-white rounded-xl font-medium"
              onClick={toggleSubjectForm}
              >
                ADD SUBJECT
            </button>
          </div>
          {subjectForm && (
            <CurriculumSubjectForm  toggleSubjectForm={toggleSubjectForm}/>
          )}
        </div>
    </div>
  );
};

export default CurriculumView;
