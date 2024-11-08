import React from 'react'

const GenerateTableHeaders = ({department, selectedDepartment, handleButtonClickDepartment}) => {
  return (
    <div className="text-md mt-5 flex gap-x-1 font-bold">
    {/* Button elements */}
    {department.map((college, index) => (
      <button
        key={index}
        className={`h-10 w-20 flex-1 rounded-t-lg sm:text-sm sm:h-8 sm:w-10 ${
          selectedDepartment === college.id
            ? "bg-green text-white"
            : "bg-gray-300 hover:bg-green hover:text-white"
        }`}
        onClick={() => handleButtonClickDepartment(college.id)}
      >
        {college.acronym}
      </button>
    ))}
  </div>
  )
}

export default GenerateTableHeaders