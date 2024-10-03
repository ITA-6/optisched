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

  const [SelectedCourse, setSelectedCourse] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen)
    setSelectedCourse(id)
  }
  const totalRows = (courses.length < 10) ? 10 : courses.length;

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
    toggleModal()
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`courses/${id}`);
      const response = await api.get("courses/");
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog()
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(courses.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <CourseTable
            toggleDialog={toggleDialog}
            courses={courses}
            openUpdate={openUpdate}
            totalRows={totalRows}
          />
        </div>

        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-52 items-center justify-center space-x-2 rounded-3xl  bg-light-green text-white"
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[20px] w-[20px]" />
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

      {isDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
              <div className="w-[20rem] h-[10rem] flex flex-col justify-center items-center bg-white rounded-md">
                <div className="flex justify-end w-full">
                  <button 
                    className="mr-5 text-white  bg-red-500 rounded-xl text-center pb-0.5 px-2"
                    onClick={() => toggleDialog()}
                  >
                    x
                  </button>
                </div>
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
                    onClick={() => handleDelete(SelectedCourse)}
                    >
                      Yes
                  </button>
                  <button
                    className="py-2 px-10 bg-red-500 text-white"
                    onClick={() => toggleDialog()}
                  >
                    No
                  </button>
                </div>
              </div>
          </div>
        )}
    </div>
  );
};

export default Course;
