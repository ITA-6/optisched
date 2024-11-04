import user from "../../../assets/user.png";
import section from "../../../assets/section.png";
import classroom from "../../../assets/classroom.png";
import course from "../../../assets/course.png";
import api from "../../../api";
import { useEffect, useState } from "react";
import DashboardTable from "./Files/DashboardTable";
import DashboardSearchField from "./Files/DashboardSearchField";

import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";

const Dashboard = () => {
  const [data, setData] = useState({});
  const {isSidebarOpen} = useSidebar();
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("account/count/");
      setData(...[response.data]);
    };

    fetchData();
  }, []);
  console.log(isSidebarOpen)
  return (
    <div className="h-screen w-screen bg-white">
      <div className={`mr-[2rem] mb grid h-screen grid-cols-[1fr_4fr_1fr] grid-rows-[1.2fr_10.6rem_1fr_8fr] justify-between grid-areas-layout  ${isSidebarOpen ? "lg:ml-[18rem]" : "ml-32"} ease-out duration-300`}>
        <div className="flex items-center justify-between gap-10 bg-light-green grid-in-box">
          <div className="ml-10 flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={user} alt="" className="w-1/3 p-8" />
            <div className="w-2/3">
              <p className="text-4xl font-extrabold">
                {data ? data.professor_count : 0}
              </p>
              <p className="text-2xl">Professors</p>
            </div>
          </div>
          <div className="flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={section} alt="" className="w-1/3 p-7" />
            <div className="w-2/3">
              <p className="text-4xl font-extrabold">
                {data ? data.section_count : 0}
              </p>
              <p className="text-2xl">Section</p>
            </div>
          </div>
          <div className="flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={classroom} alt="" className="w-1/3 p-7" />
            <div className="w-2/3">
              <p className="text-4xl font-extrabold">
                {data ? data.room_count : 0}
              </p>
              <p className="text-2xl">Classroom</p>
            </div>
          </div>
          <div className="mr-10 flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={course} alt="" className="w-1/3 p-8" />
            <div className="w-2/3">
              <p className="text-4xl font-extrabold">
                {data ? data.course_count : 0}
              </p>
              <p className="text-2xl">Courses</p>
            </div>
          </div>
        </div>
        <div className="grid-in-text">
          <DashboardSearchField />
        </div>
        <div className="grid-in-history overflow-y-scroll mb-20">
          <DashboardTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
