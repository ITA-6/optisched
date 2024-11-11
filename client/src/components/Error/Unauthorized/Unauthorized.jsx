import {React, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import pncHeader from "../../../assets/pncHeader.png"
import optisched from "../../../assets/optisched.png"
import {jwtDecode} from "jwt-decode"
const Unauthorized = () => {

  const {user_type} = jwtDecode(localStorage.getItem("access_token"));
  const [component, setComponent] = useState();
  const navigate = useNavigate();
 
  const handleNavigation = () => {
    switch (user_type) {
      case "R":
        navigate("/admin");
        break;
      case "P":
        navigate("/user");
        break;
      case "DC":
      case "D":
        navigate("/sub-admin");
        break;
      default:
        navigate("/Unauthorized");
    }
  };
  useEffect(() => {
    switch (user_type) {
      case "R":
        setComponent("Back to Admin Dashboard");
        break;
      case "P":
        setComponent("Back to User Page");
        break;
      case "DC":
      case "D":
        setComponent("Back to Sub-Admin");
        break;
      default:
        setComponent("Back to Home");
    }
  }, [user_type]); // Add user_type as a dependency

  
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
            onClick={handleNavigation}
          >
            {component}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized