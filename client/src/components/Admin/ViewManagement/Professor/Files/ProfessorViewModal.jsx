import React from 'react'

const ProfessorViewModal = ({selectedProf,toggleViewProfessor}) => {
  console.log(selectedProf)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-2/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src="" alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
            Full Details
          </h2>
        </div>
        {selectedProf.map((professor) => (
          <div className="flex flex-col gap-10 my-10 mx-20" key={professor.prof_id}>
            <div className="flex flex-col">
              <p className="text-sm">Professor ID </p>
              <p className='text-xl'>{professor.prof_id}</p>
            </div>
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col gap-1 text-xl">
                <p className="text-sm">First Name</p>
                <p className="">{professor.first_name}</p>
              </div>
              <div className="flex flex-col text-xl gap-1">
                <p className="text-sm">Middle Name</p>
                <p className="">{professor.middle_name}</p>
              </div>
              <div className="flex flex-col text-xl gap-1">
                <p className="text-sm">Last Name</p>
                <p className="">{professor.last_name}</p>
              </div>
            </div>
            <div className="flex flex-row text-xl ">
              <div className="flex flex-col gap-1">
                <p className="text-sm">Birthdate</p>
                <p className=''>{professor.birth_date}</p>
              </div>
              <div className=" ml-[17rem] flex flex-col">
                 <p className="text-sm">Email</p>
                 <p>{professor.email}</p>
              </div>
            </div>

            <div className="flex flex-row  justify-between">
              <div className="flex flex-col text-xl gap-1">
                <p className="text-sm">Department Name</p>
                <p>{professor.department_name}</p>
              </div>
              <div className="flex flex-col text-xl gap-1">
                <p className="text-sm">Masteral</p>
                <p>{professor.has_masteral === "Y" ? "Yes" : professor.has_masteral === "" ? "" : "No"}</p>
              </div>
              <div className="flex flex-col text-xl gap-1">
                <p className="text-sm">Employment Status</p>
                <p>{professor.employment_status}</p>
              </div>
            </div>
          </div>
        ))}
        <button
          className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
          onClick={toggleViewProfessor}
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default ProfessorViewModal