import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import CourseTable from "./Files/CourseTable";
import api from "../../../../api";
import {useSidebar} from "../../../Users/Sidenav/SidenavContext/SidenavContext"

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const totalRows = (courses.length < 10) ? 10 : courses.length;
  const {isSidebarOpen} = useSidebar();


  useEffect(() => {
    const fetchData = async () => {
      const response = await api("courses/");
      setCourses(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-screen bg-white font-noto">
    <div className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]": "lg:ml-32"} ease-linear duration-200`}>
      <SearchField />
      <div className={`mr-5 h-full grid-in-userTable ${(courses.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <CourseTable
            courses={courses}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
