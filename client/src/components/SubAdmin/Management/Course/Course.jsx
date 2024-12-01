import { useEffect, useState } from "react";

import add from "../../../../assets/add.png";

import SearchField from "./Files/SearchField";
import CourseTable from "./Files/CourseTable";
import CourseForm from "./Files/CourseForm";
import api from "../../../../api";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { isSidebarOpen } = useSidebar();
  const [SelectedCourse, setSelectedCourse] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getAllCourseType = [
    ...new Set(courses.map((course) => course.category)),
  ];

  console.log(courses);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Set initial filtered courses when component mounts or courses change
    setFilteredCourses(courses);
  }, [courses]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterCourses(searchTerm, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterCourses(searchTerm, category);
  };

  const filterCourses = (searchTerm, category) => {
    const filteredItems = courses.filter((course) => {
      // Check if course's category matches the selected category, if any
      const matchesCategory = category ? course.category === category : true;

      // Check if any relevant field in course data starts with the search term
      const matchesSearchTerm =
        course.name.toLowerCase().startsWith(searchTerm) ||
        course.code.toLowerCase().startsWith(searchTerm) ||
        course.category.toLowerCase().startsWith(searchTerm);

      // Return true if both conditions match
      return matchesCategory && matchesSearchTerm;
    });

    setFilteredCourses(filteredItems);
  };

  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedCourse(id);
  };

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
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`courses/${id}`);
      const response = await api.get("courses/");
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog();
  };

  return (
    <div className="h-screen w-screen bg-white">
      <div
        className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        <SearchField
          handleInputChange={handleInputChange}
          handleCategoryChange={handleCategoryChange}
          getAllCourseType={getAllCourseType}
        />
        <div
          className={`mr-5 grid-in-userTable sm:ml-10 sm:mr-3 lg:ml-0 ${filteredCourses.length > 10 ? "overflow-y-scroll" : "overflow-hidden"} relative`}
        >
          <CourseTable
            toggleDialog={toggleDialog}
            filteredCourses={filteredCourses}
            openUpdate={openUpdate}
          />
        </div>

        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-52 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white"
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
          courses={courses}
        />
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[10rem] w-[20rem] flex-col items-center justify-center rounded-md bg-white">
            <div className="flex w-full justify-end">
              <button
                className="mr-5 rounded-xl bg-red-500 px-2 pb-0.5 text-center text-white"
                onClick={() => toggleDialog()}
              >
                x
              </button>
            </div>
            <div className="text-md mb-3 flex h-1/3 items-center px-10 text-center font-medium">
              <h1>Are you sure? you want to delete this item?</h1>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-green px-10 py-2 text-center text-white"
                onClick={() => handleDelete(SelectedCourse)}
              >
                Yes
              </button>
              <button
                className="bg-red-500 px-10 py-2 text-white"
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
