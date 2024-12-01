import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import CourseTable from "./Files/CourseTable";
import api from "../../../../api";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const { isSidebarOpen } = useSidebar();

  const getAllCourseType = [
    ...new Set(courses.map((course) => course.category)),
  ];

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await api("courses/");
      setCourses(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-screen bg-white font-noto">
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
          <CourseTable filteredCourses={filteredCourses} />
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
