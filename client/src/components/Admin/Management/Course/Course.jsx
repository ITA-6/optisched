import { useEffect, useState } from "react";

import add from "../../../../assets/add.png";

import SearchField from "./Files/SearchField";
import CourseTable from "./Files/CourseTable";
import CourseForm from "./Files/CourseForm";
import api from "../../../../api";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api("courses/");
      setCourses(response.data);
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

  const submitCourse = async (course) => {
    try {
      await api.post("courses/", course);
      const response = await api("courses/");
      setCourses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCourse = async (course) => {
    try {
      await api.put(`courses/${course.id}/`, course);
      const response = await api("courses/");
      setCourses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`courses/${id}`);
      const response = await api.get("courses/");
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <CourseTable
            handleDelete={handleDelete}
            courses={courses}
            openUpdate={openUpdate}
          />
        </div>

        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <CourseForm
          toggleModal={toggleModal}
          handler={initialData ? updateCourse : submitCourse}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default Course;
