import React from 'react'

const CurriculumSubjectForm = ({toggleForm}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-2/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={parameters}  alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold text-white">
            Add New Subject
          </h2>
        </div>

        <form action="" className="flex flex-col gap-6 my-10 text-base">
          <div className="flex flex-row gap-10 mx-10">
            <div className="flex flex-col flex-1 gap-1">
              <label 
                htmlFor="code"
              >
                Code</label>
              <input 
                type="text"
                className="border border-gray-300 p-1 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <label 
                htmlFor="title"
              >
                Title</label>
              <input 
                type="text" 
                className="border border-gray-300 p-1 rounded-md w-full"
              />
            </div>
          </div>
         
          <div className="flex flex-row gap-10 mx-10">
            <div className="flex flex-col flex-1 gap-1">
              <label 
                htmlFor="lec"
              >
                Lecture</label>
              <input 
                type="number"
                className="border border-gray-300 p-1 rounded-md w-full"
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label 
                htmlFor="lab"
              >
                Laboratory</label>
              <input 
                type="number"
                className="border border-gray-300 p-1 rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex flex-row mx-10 gap-10">
            <div className="flex flex-col flex-1 gap-1">
              <label
                htmlFor="total"
              >
                Total</label>
              <input 
                type="number"
                className="border border-gray-300 rounded-md p-1"
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label 
                htmlFor="pre"
              >
                Prerequisite</label>
              <input 
              type="text"
              className="border border-gray-300 rounded-md p-1"
              />
            </div>
          </div>
          <div className="flex justify-end items-center mr-14">
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
            onClick={toggleForm}
          >
            &times;
          </button>
      </div>
    </div>
  )
}

export default CurriculumSubjectForm