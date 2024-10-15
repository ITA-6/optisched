import React from 'react'

const CurriculumSemesterForm = ({toggleSemesterForm}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-1/3 rounded-lg bg-white shadow-lg">
            <div className="flex h-[10*] items-center justify-center bg-green">
                <img src=""  alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
                <h2 className="ml-2 text-3xl font-extrabold text-white">
                Add New Semester
                </h2>
            </div>
            <form action="">
                <div className="flex flex-col">
                    <div className="flex flex-col flex-1  gap-2 p-5 mt-10">
                        <label htmlFor="year">Year Level</label>
                        <select name="year" id="year" className='w-full p-2 border border-gray-30 rounded-md'>
                            <option value="">Select Year</option>
                            <option value="first_year">First Year</option>
                            <option value="second_year">Second Year</option>
                            <option value="third_year">Third Year</option>
                            <option value="fourth_year">Fourth Year</option>
                        </select>
                    </div>
                    <div className="flex flex-col flex-1 gap-2 p-5">
                        <label htmlFor="year">Semester</label>
                        <select name="year" id="year" className='w-full p-2 border border-gray-30 rounded-md'>
                            <option value="">Select Semester</option>
                            <option value="first_year">First Semester</option>
                            <option value="second_year">Second Semester</option>
                           
                        </select>
                    </div>
                </div>
                <div className="flex justify-end items-center mr-14 mb-10">
                    <button 
                    type="submit"
                    className="bg-green text-white px-5 py-2 rounded-md"
                    >
                    Confirm
                    </button>
                </div>
            </form>

            <button
            className="absolute right-3 top-3 rounded-full bg-red-500 px-2 pb-1 text-white"
            onClick={toggleSemesterForm}
          >
            &times;
          </button>
        </div>

    </div>
  )
}

export default CurriculumSemesterForm