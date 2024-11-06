import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import ScheduleTable from './Files/ScheduleTable'
import { useSidebar } from "../Sidenav/SidenavContext/SidenavContext";

const Schedule = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="min-h-screen w-screen bg-gray-50 mr-10  ">
      <div className={`flex flex-col  text-black text-2xl h-full  ease-in duration-300  ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-20"} ease-out duration-200`}>
         <div className="flex mb-5 mx-4 mt-20 xm:mt-20">
            <FontAwesomeIcon 
              icon={faBarsProgress}
              color='white'
              className='xm:text-xs xm:rounded-md xm:p-1 lg:p-2 bg-light-green rounded-xl'
            />
            <h1 className="font-medium text-lg  ml-2 xm:text-[0.6rem] xm:-mt-[0.4rem]">My Schedule</h1>
         </div>
      
         <div className="overflow-x-scroll ml-4 mr-4 xl:overflow-hidden">
            <ScheduleTable />
         </div>
         <div className="flex justify-center items-center xm:h-14 sm:h-20">Footer @PNC</div>
      </div>
    </div>
  )
}

export default Schedule