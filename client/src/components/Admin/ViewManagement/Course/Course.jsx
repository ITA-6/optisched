import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import CourseTable from "./Files/CourseTable";
import api from "../../../../api";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const totalRows = (courses.length < 10) ? 10 : courses.length;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api("courses/");
      setCourses(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
    <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
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
