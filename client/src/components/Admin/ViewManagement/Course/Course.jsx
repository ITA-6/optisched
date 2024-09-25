import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import CourseTable from "./Files/CourseTable";
import api from "../../../../api";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api("courses/");
      setCourses(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <CourseTable
            courses={courses}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
