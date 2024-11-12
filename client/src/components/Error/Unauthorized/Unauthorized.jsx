import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import pncHeader from "../../../assets/pncHeader.png";
import optisched from "../../../assets/optisched.png";
import {jwtDecode} from "jwt-decode";

const Unauthorized = () => {
  const [userType, setUserType] = useState(null); // Initialize userType as null
  const [component, setComponent] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage and decode it
    const token = localStorage.getItem("access_token");
    if (token && typeof token === 'string') {
      try {
        const { user_type } = jwtDecode(token);
        setUserType(user_type); // Set userType after decoding
      } catch (error) {
        console.error('Invalid token', error);
      }
    } else {
      console.error('No valid token found in localStorage');
    }
  }, []); // Only run once on component mount

  useEffect(() => {
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
  }, [userType]); // Re-run whenever userType changes

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

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col items-center mt-20">
        <img src={pncHeader} alt="" className='w-[30rem]' />
        <img src={optisched} alt="" className='w-[15rem]' />

        <div className="mt-10">
          <h1 className="font-bold text-3xl text-center">401 - Unauthorized</h1>
          <h1 className='text-lg mt-5'>
            Sorry, You do not have access to the website you are trying to access
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
  );
};

export default Unauthorized;
