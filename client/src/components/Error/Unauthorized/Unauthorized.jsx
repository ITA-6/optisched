import {React, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import pncHeader from "../../../assets/pncHeader.png"
import optisched from "../../../assets/optisched.png"
import {jwtDecode} from "jwt-decode"
const Unauthorized = () => {

  // Get the token from localStorage
    const token = localStorage.getItem("access_token");

    // Check if the token exists and is a valid string
    if (token && typeof token === 'string') {
      try {
        // Decode the token
        const { user_type } = jwtDecode(token);
        setUserType(user_type)
      } catch (error) {
        console.error('Invalid token', error); // Handle decoding error if the token is invalid
      }
    } else {
      console.error('No valid token found in localStorage');
      // Handle the case where there is no token or it is not a string
    }
  
  const [component, setComponent] = useState();
  const navigate = useNavigate();
 const [userType, setUserType] = useState();
  const handleNavigation = () => {
    switch (userType) {
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
        navigate("/");
    }
  };
  useEffect(() => {
    if(!userType) return navigate("/")
    switch (userType) {
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
  }, [userType]); // Add user_type as a dependency

  
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