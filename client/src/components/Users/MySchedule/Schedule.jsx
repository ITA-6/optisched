import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import ScheduleTable from './Files/ScheduleTable'

const Schedule = () => {
  return (
    <div className="flex h-screen  w-full bg-gray-50 overflow-auto">
      <div className="flex flex-col mt-[7rem] ml-[18rem] mr-[2rem] h-[170vh] w-screen text-black text-2xl mb-[10rem]">
         <div className="flex mb-5">
            <FontAwesomeIcon 
              icon={faBarsProgress} 
              size='xl'
              className='p-2 bg-light-green rounded-xl'
            />
            <h1 className="font-bold text-lg text-center ml-2 mt-2">My Schedule</h1>
         </div>
         
         {/* table */}
          <ScheduleTable />
      </div>
    </div>
  )
}

export default Schedule