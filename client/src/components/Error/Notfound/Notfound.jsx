import React from 'react'
import pncHeader from "../../../assets/pncHeader.png"
import optisched from "../../../assets/optisched.png"
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
  const navigate = useNavigate()

  const dashboardBtn = () => {
    navigate("admin")
  }

  return (
   <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col items-center mt-20">
        <img 
          src={pncHeader} 
          alt="" 
          className='w-[30rem]'
        />

        <img 
          src={optisched}
          alt="" 
          className='w-[15rem] '
        />

        <div className="mt-10">
          <h1 
          className="font-bold text-3xl text-center"
          >
            404 - Not Found
          </h1>
          <h1
            className='text-xl mt-5'
          >
            Sorry, The Page  you are trying to access does not exist
          </h1>
        </div>
        <div className="flex justify-center mt-[3rem]">
          <button 
          className="bg-green py-3 px-6 rounded-[2rem] text-white font-bold"
          onClick={() => dashboardBtn()}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notfound;