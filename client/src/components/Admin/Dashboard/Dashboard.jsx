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
  
  return (
    <div className="xm:h-[140vh] w-full overflow-hidden bg-white font-noto ">
      <div className={`xm:mx-10 sm:mx-4 xm:mt-20 sm:mt-20 ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} ease-out duration-300`}>
        <div className="flex items-center justify-between gap-2 bg-light-green grid-in-box overflow-auto xm:h-[30rem] sm:h-[22rem] flex-col md:flex-row md:h-40 lg:h-44">


          <div className="w-full flex flex-1 justify-center items-center xm:flex-col xm:gap-y-2 xm:mt-5  sm:flex-row sm:mt-4 md:mt-0 md:flex lg:flex-row xl:gap-x-5 h-full xl:ml-10">
            <div className="  xm:w-10/12 sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3 flex flex-1 items-center rounded-3xl bg-white">
              <div className="w-6/12 flex justify-center xm:w-8/12 sm:w-10/12">
                <img src={user} alt="" className="xm:w-14 sm:w-16 md:w-14 lg:w-16" />
              </div>
              <div className="w-full">
                <p className="font-extrabold  sm:text-3xl lg:text-4xl xm:text-4xl">
                  {data ? data.professor_count : 0}
                </p>
                <p className="xm:text-2xl sm:text-lg md:text-base">Professors</p>
              </div>
            </div>


            <div className="  xm:w-10/12 sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3 flex flex-1 items-center rounded-3xl bg-white">
              <div className="w-6/12 flex justify-center">
                <img src={section} alt="" className="xm:w-14 sm:w-16 md:w-14 lg:w-16" />
              </div>
              <div className="w-2/3">
                <p className="text-4xl font-extrabold  sm:text-3xl lg:text-4xl">
                  {data ? data.section_count : 0}
                </p>
                <p className="xm:text-2xl sm:text-lg md:text-base">Section</p>
              </div>
            </div>
          </div>


          <div className="w-full flex flex-1 justify-center items-center xm:flex-col xm:gap-y-2 xm:mb-5  sm:flex-row sm:mb-4 md:flex md:mb-0 lg:flex-row xl:gap-x-5 h-full xl:mr-10">
          <div className="xm:w-10/12 sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3  flex flex-1 items-center rounded-3xl bg-white">
              <div className="w-6/12 flex justify-center">
                <img src={classroom} alt=""  className="xm:w-14 sm:w-16 md:w-14 lg:w-16" />
              </div>
              <div className="w-2/3">
                <p className="text-4xl font-extrabold sm:text-3xl lg:text-4xl">
                  {data ? data.room_count : 0}
                </p>
                <p className="xm:text-2xl sm:text-lg md:text-base lg:text-xl">Room</p>
              </div>
            </div>


            <div className="  xm:w-10/12 sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3 flex flex-1 items-center rounded-3xl bg-white">
              <div className="w-6/12 flex justify-center">
                <img src={course} alt="" className="xm:w-14 sm:w-16 md:w-14 lg:w-16" />
              </div>
              <div className="w-2/3">
                <p className="text-4xl font-extrabold  sm:text-3xl lg:text-4xl">
                  {data ? data.course_count : 0}
                </p>
                <p className="xm:text-2xl sm:text-lg md:text-base">Course</p>
              </div>
            </div>
          </div>
        </div>


        <div className="grid-in-text mb-5">
          <DashboardSearchField />
        </div>
        <div className="grid-in-history overflow-y-scroll xm:h-[30em] h-[30em]">
          <DashboardTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
