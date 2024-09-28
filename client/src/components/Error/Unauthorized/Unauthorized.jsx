import {React} from 'react'
import { Link } from "react-router-dom";
import pncHeader from "../../../assets/pncHeader.png"
import optisched from "../../../assets/optisched.png"
const Unauthorized = () => {
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
            401 - Unauthorized
          </h1>
          <h1
            className='text-lg   mt-5'
          >
            Sorry, You do not have access on the website you are trying to access
          </h1>
        </div>
        <div className="flex justify-center mt-[3rem]">
          <button 
            className="bg-green py-3 px-6 rounded-[2rem] text-white font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized