import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import ScheduleTable from './Files/ScheduleTable'
import { useSidebar } from "../Sidenav/SidenavContext/SidenavContext";

const Schedule = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="h-screen  w-screen bg-gray-50 xl:overflow-auto mr-10  ">
      <div className={`flex flex-col  text-black text-2xl  xm:min-h-[165vh] sm:h-[185vh] md:h-[160vh] ease-in duration-300  ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-20"}`}>
         <div className="flex mb-5 mx-4 mt-20">
            <FontAwesomeIcon 
              icon={faBarsProgress}
              color='white'
              className='p-2 bg-light-green rounded-xl'
            />
            <h1 className="font-bold text-lg text-center ml-2 mt-2">My Schedule</h1>
         </div>
      
         <div className="overflow-x-scroll ml-4 mr-4 xm:max-h-[160.5vh] sm:max-h-[160.5vh] md:max-h-[190vh] xl:overflow-hidden">
            <ScheduleTable />
         </div>
         <div className="flex justify-center items-center xm:h-14 sm:h-20">Footer @PNC</div>
      </div>
    </div>
  )
}

export default Schedule