import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const SubAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const generatedPattern = /^\/admin\/generated\/[^/]+$/; // Matches /admin/generated/:name

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      // If no token, redirect to login page
      navigate("/", { replace: true });
    } else {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.user_type !== "D" && decodedToken.user_type !== "DC") {
          // If user is not authorized for SubAdmin, redirect to unauthorized page
          navigate("/unauthorized", { replace: true });
        }
        // Otherwise, allow access and stay on the current page
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/", { replace: true }); // Redirect to login if token is invalid
      }
    }
  }, [navigate]);

  const getPageName = (path) => {
    switch (path) {
      case "/sub-admin":
      case "/sub-admin/management/professor":
        return "MANAGE PROFESSOR";
      case "/sub-admin/management/section":
        return "MANAGE SECTION";
      case "/sub-admin/management/classroom":
        return "MANAGE CLASSROOM";
      case "/admin/management/section":
        return "Manage SECTION";
      case "/sub-admin/management/course":
        return "MANAGE COURSE";
      case "/sub-admin/management/building":
        return "MANAGE BUILDING";
      case "/admin/curriculum":
        return "Curriculum";
      case "/sub-admin/management/program":
        return "MANAGE PROGRAM";
      default:
        return "Sub Admin Dashboard";
    }
  };

  return (
    <>
      <Header pageName={getPageName(location.pathname)} />
      <Sidenav />
    </>
  );
};

export default SubAdmin;
