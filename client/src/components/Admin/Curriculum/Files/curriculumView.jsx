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
  const [course, setCourse] = useState([]);

  const [programId, setProgramId] = useState(location.state.id);

  const fetchCurriculums = async () => {
    try {
      // Fetch courses first
      const courseResponse = await api("courses/");
      setCourse(courseResponse.data); // Always set the course data even if curriculum is empty

      // Fetch curriculums
      const response = await api(`curriculum/?program_id=${location.state.id}`);
      if (!response.data || response.data.length === 0) {
        console.warn("No existing curriculum found.");
        setCurriculums([]); // Set curriculums to an empty array if no data
      } else {
        setCurriculums(response.data); // Update curriculums with fetched data
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      // If curriculum fails to load, ensure courses are still available
      if (error.response && error.response.status === 404) {
        console.warn("Curriculum not found for the given program ID.");
        setCurriculums([]); // Set curriculums to empty array
      } else {
        console.error("Error fetching curriculums or courses:", error);
      }
    }
  };

  console.log(curriculums);
  // Initial fetch
  useEffect(() => {
    fetchCurriculums();
  }, []);

  const toggleSubjectForm = () => {
    setSubjectForm(!subjectForm);
  };

  const submitSubject = async (subject) => {
    try {
      console.log(subject);
      await api.post("curriculum/", subject);
      fetchCurriculums(); // Fetch updated curriculums
      toggleSubjectForm(); // Close the modal
    } catch (error) {
      console.error("Error submitting subject:", error);
    }
  };

  const UpdateCurriculum = async (subject) => {
    try {
      await api.put(`curriculum/${subject.id}/`, subject);

      // Re-fetch curriculums
      fetchCurriculums();

      // Close the modal
      toggleSubjectForm();
    } catch (error) {
      console.error("Error updating curriculum:", error);
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
            programId={programId}
          />
        )}
      </div>
    </div>
  );
};

export default CurriculumView;
