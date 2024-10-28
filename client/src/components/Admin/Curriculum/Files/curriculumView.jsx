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
    <div className="flex flex-row h-screen overflow-auto-scroll overflow-x-hidden">
      <div className="w-64"></div>{" "}
        <div className="container mx-auto px-4 pt-6 pb-16">
          <h2 className="mb-4 mt-8 text-center text-xl font-bold">CURRICULUM</h2>
          {curriculums?.map((curriculum, index) => (
            <CurriculumTable key={index} curriculum={curriculum} />
          ))}
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
