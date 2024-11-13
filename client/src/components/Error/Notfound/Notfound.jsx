import React, { useEffect, useState } from "react";
import pncHeader from "../../../assets/pncHeader.png";
import optisched from "../../../assets/optisched.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Notfound = () => {
  const [userType, setUserType] = useState(null); // Initialize userType as null
  const [component, setComponent] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage and decode it
    const token = localStorage.getItem("access_token");
    if (token && typeof token === "string") {
      try {
        const { user_type } = jwtDecode(token);
        setUserType(user_type); // Set userType after decoding
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.error("No valid token found in localStorage");
    }
  }, []); // Only run once on component mount

  useEffect(() => {
    switch (userType) {
      case "R":
        setComponent("Back to Admin ");
        break;
      case "P":
        setComponent("Back to User");
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
      case "VPAA":
        navigate("/user/vpaa");
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
    <div className="flex h-screen w-screen justify-center">
      <div className="mt-20 flex flex-col items-center">
        <img src={pncHeader} alt="" className="w-[30rem]" />

        <img src={optisched} alt="" className="w-[15rem]" />

        <div className="mt-10">
          <h1 className="text-center text-3xl font-bold">404 - Not Found</h1>
          <h1 className="mt-5 text-xl">
            Sorry, The Page you are trying to access does not exist
          </h1>
        </div>
        <div className="mt-[3rem] flex justify-center">
          <button
            className="rounded-[2rem] bg-green px-6 py-3 font-bold text-white"
            onClick={handleNavigation}
          >
            {component}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
