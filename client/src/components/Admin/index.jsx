import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const Admin = () => {
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

        if (decodedToken.user_type !== "R") {
          // If user is not admin, redirect to unauthorized page
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
      case "/admin":
      case "/admin/dashboard":
        return "ADMIN DASHBOARD";
      case "/admin/user/manage":
        return "MANAGE USERS";
      case "/admin/view/professor":
        return "PROFESSORS";
      case "/admin/view/section":
        return "SECTIONS";
      case "/admin/view/classroom":
        return "CLASSROOMS";
      case "/admin/generate":
        return "GENERATE";
      case "/admin/curriculum":
        return "CURRICULUM";
      case "/admin/view/building":
        return "BUILDINGS";
      case "/admin/view/college":
        return "MANAGE COLLEGE";
      case "/admin/view/course":
        return "COURSES";
      case "/admin/view/program":
        return "PROGRAMS";
      default:
        if (generatedPattern.test(path)) {
          return "Generate Schedule";
        }
        return "Admin Dashboard";
    }
  };

  return (
    <>
      <Header pageName={getPageName(location.pathname)} />
      <Sidenav />
    </>
  );
};

export default Admin;
