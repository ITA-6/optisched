import React from 'react'
import { useState } from 'react';
import ConstraintForm from './Files/ConstraintForm';
const Constraint = () => {
  const [modalOpen ,setModalOpen]  = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }
  return (
    <div className="h-full w-screen bg-white">
      <div className="ml-[20rem] mt-[5rem] grid h-full">
        <div className="mr-5 flex flex-col gap-5 ">
            <p>Time : </p>
            <p>Vacant :</p>
            <p>EmploymentStatus :</p>
            <p>Pairing Day :</p>
        </div>
        <div className="flex justify-end mr-[15rem] mt-[2rem]">
              <button 
              onClick={toggleModal}
              className="bg-green text-white px-2 py-1 rounded-md"
              >
                Update</button>
        </div>
      </div>

      {modalOpen && (
        <ConstraintForm 
        toggleModal={toggleModal} />
      )}
    </div>
  )
}

export default Constraint