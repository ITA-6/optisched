import React from 'react'

const GenerateTable = () => {
  return (
    <table className=" table-auto">
      <thead className="bg-green">
        <tr className='text-white text-xs '>
          <th className='p-1 w-64'>Course Code</th>
          <th className='w-64'>Course Description</th>
          <th className='w-64'>Lec Units</th>
          <th className='w-64'>Lab Units</th>
          <th className='w-64'>Day</th>
          <th className='w-64'>Time</th>
          <th className='w-64'>Room</th>
          <th className='w-64'>Section</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border border-black border-collapse">
          <th className="h-[1.5rem] border border-black font-medium">RIZ101</th>
          <th className="h-[1.5rem] border border-black font-medium">Life and Works of Rizal</th>
          <th className="h-[1.5rem] border border-black font-medium">3</th>
          <th className="h-[1.5rem] border border-black font-medium">0</th>
          <th className="h-[1.5rem] border border-black font-medium">M/WF</th>
          <th className="h-[1.5rem] border border-black font-medium">9:00-10:00 AM</th>
          <th className="h-[1.5rem] border border-black font-medium">Room 101</th>
          <th className="h-[1.5rem] border border-black font-medium">A1</th>
        </tr>
        <tr className="border border-black border-collapse">
          <th className="h-[1.5rem] border border-black font-medium">CS101</th>
          <th className="h-[1.5rem] border border-black font-medium">Introduction to Computer Science</th>
          <th className="h-[1.5rem] border border-black font-medium">3</th>
          <th className="h-[1.5rem] border border-black font-medium">1</th>
          <th className="h-[1.5rem] border border-black font-medium">T/Th</th>
          <th className="h-[1.5rem] border border-black font-medium">10:00-11:30 AM</th>
          <th className="h-[1.5rem] border border-black font-medium">Room 202</th>
          <th className="h-[1.5rem] border border-black font-medium">B2</th>
        </tr>
        <tr className="border border-black border-collapse">
          <th className="h-[1.5rem] border border-black font-medium">MATH201</th>
          <th className="h-[1.5rem] border border-black font-medium">Calculus I</th>
          <th className="h-[1.5rem] border border-black font-medium">4</th>
          <th className="h-[1.5rem] border border-black font-medium">0</th>
          <th className="h-[1.5rem] border border-black font-medium">M/WF</th>
          <th className="h-[1.5rem] border border-black font-medium">1:00-2:30 PM</th>
          <th className="h-[1.5rem] border border-black font-medium">Room 105</th>
          <th className="h-[1.5rem] border border-black font-medium">C3</th>
        </tr>
        <tr className="border border-black border-collapse">
          <th className="h-[1.5rem] border border-black font-medium">PHY301</th>
          <th className="h-[1.5rem] border border-black font-medium">Physics I</th>
          <th className="h-[1.5rem] border border-black font-medium">3</th>
          <th className="h-[1.5rem] border border-black font-medium">1</th>
          <th className="h-[1.5rem] border border-black font-medium">T/Th</th>
          <th className="h-[1.5rem] border border-black font-medium">3:00-4:30 PM</th>
          <th className="h-[1.5rem] border border-black font-medium">Room 303</th>
          <th className="h-[1.5rem] border border-black font-medium">D4</th>
        </tr>
        <tr className="border border-black border-collapse">
          <th className="h-[1.5rem] border border-black font-medium">ENG102</th>
          <th className="h-[1.5rem] border border-black font-medium">English Communication Skills</th>
          <th className="h-[1.5rem] border border-black font-medium">3</th>
          <th className="h-[1.5rem] border border-black font-medium">0</th>
          <th className="h-[1.5rem] border border-black font-medium">M/WF</th>
          <th className="h-[1.5rem] border border-black font-medium">2:00-3:00 PM</th>
          <th className="h-[1.5rem] border border-black font-medium">Room 204</th>
          <th className="h-[1.5rem] border border-black font-medium">E5</th>
        </tr>
      </tbody>
    </table>
  )
}

export default GenerateTable