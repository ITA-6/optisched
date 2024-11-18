import user from "../../../assets/user.png";
import section from "../../../assets/section.png";
import classroom from "../../../assets/classroom.png";
import course from "../../../assets/course.png";
import api from "../../../api";
import { useEffect, useState } from "react";

import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";

const SubAdminDashboard = () => {
  const [data, setData] = useState({});
  const { isSidebarOpen } = useSidebar();
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("account/count/");
      setData(...[response.data]);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-full w-full overflow-hidden bg-white font-noto">
      <div
        className={`sm:mx-4 sm:mt-20 xm:mx-10 xm:mt-20 ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-300 ease-out`}
      >
        <div className="flex flex-col items-center justify-between gap-2 overflow-auto bg-light-green grid-in-box sm:h-[22rem] md:h-40 md:flex-row lg:h-44 xm:h-[30rem] xm:bg-white">
          <div className="flex h-full w-full flex-1 items-center justify-center sm:mt-4 sm:flex-row md:mt-0 md:flex lg:flex-row xl:ml-10 xl:gap-x-5 xm:mt-5 xm:flex-col xm:gap-y-2">
            <div className="flex flex-1 items-center rounded-3xl bg-white sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3 xm:w-10/12 xm:bg-light-green">
              <div className="flex w-6/12 justify-center sm:w-10/12 xm:w-8/12">
                <img
                  src={user}
                  alt=""
                  className="sm:w-16 md:w-14 lg:w-16 xm:w-14"
                />
              </div>
              <div className="w-full">
                <p className="font-extrabold sm:text-3xl md:text-black lg:text-4xl xm:text-4xl xm:text-white">
                  {data ? data.professor_count : 0}
                </p>
                <p className="sm:text-lg md:text-base md:text-black xm:text-2xl xm:text-white">
                  Professors
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center rounded-3xl bg-white sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3 xm:w-10/12 xm:bg-light-green">
              <div className="flex w-6/12 justify-center">
                <img
                  src={section}
                  alt=""
                  className="sm:w-16 md:w-14 lg:w-16 xm:w-14"
                />
              </div>
              <div className="w-2/3">
                <p className="text-4xl font-extrabold sm:text-3xl md:text-black lg:text-4xl xm:text-white">
                  {data ? data.section_count : 0}
                </p>
                <p className="sm:text-lg md:text-base md:text-black xm:text-2xl xm:text-white">
                  Section
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-full w-full flex-1 items-center justify-center sm:mb-4 sm:flex-row md:mb-0 md:flex lg:flex-row xl:mr-10 xl:gap-x-5 xm:mb-5 xm:flex-col xm:gap-y-2">
            <div className="flex flex-1 items-center rounded-3xl bg-white sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3 xm:w-10/12 xm:bg-light-green">
              <div className="flex w-6/12 justify-center">
                <img
                  src={classroom}
                  alt=""
                  className="sm:w-16 md:w-14 lg:w-16 xm:w-14"
                />
              </div>
              <div className="w-2/3">
                <p className="text-4xl font-extrabold sm:text-3xl md:text-black lg:text-4xl xm:text-white">
                  {data ? data.room_count : 0}
                </p>
                <p className="sm:text-lg md:text-base md:text-black lg:text-xl xm:text-2xl xm:text-white">
                  Room
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center rounded-3xl bg-white sm:mx-4 sm:h-[90%] md:mx-4 md:h-2/3 xm:w-10/12 xm:bg-light-green">
              <div className="flex w-6/12 justify-center">
                <img
                  src={course}
                  alt=""
                  className="sm:w-16 md:w-14 md:text-black lg:w-16 xm:w-14 xm:text-white"
                />
              </div>
              <div className="w-2/3">
                <p className="text-4xl font-extrabold sm:text-3xl md:text-black lg:text-4xl xm:text-white">
                  {data ? data.course_count : 0}
                </p>
                <p className="sm:text-lg md:text-base md:text-black xm:text-2xl xm:text-white">
                  Course
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminDashboard;
