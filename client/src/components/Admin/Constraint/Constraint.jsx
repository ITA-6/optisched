import React from 'react'
import { useState } from 'react';
import ConstraintTable from './Files/ConstraintTable';
import add from "../../../assets/add.png"
const Constraint = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[20rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[6fr_3fr] grid-areas-constraint-layout">
        <div className="mr-5 grid grid-rows-[1fr_4fr] grid-areas-constraint-table-layout grid-in-userTable">
          <ConstraintTable /> 
        </div>
        {/* add Constraint Table */}
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-48 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white"
            onClick={openModal}
          >
            <img src={add} alt=""  className='w-7 h-7'/>
            <span>Add New Constraint</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && closeModal}
    </div>
  )
}

export default Constraint