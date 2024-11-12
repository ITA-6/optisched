import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const Admin = () => {
  const location = useLocation();
  const generatedPattern = /^\/admin\/generated\/[^/]+$/; // Matches /admin/generated/:name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
  
    if (!token) {
      navigate("/"); // Redirect if token is null
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      
      if (decodedToken.user_type === "R") {
        navigate("/admin"); // Redirect if user_type is "R"
      } else {
        navigate("/unauthorized"); // Redirect if user_type is not "R"
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/"); // Redirect if token is invalid or decoding fails
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
      case "/admin/view/department":
        return "COLLEGES";
      case "/admin/view/course":
        return "COURSES";
      case "/admin/view/program":
        return "PROGRAMS";
      case "/admin/generated/":
        return "Generate SCHEDULE";
      default:
        // Check if path matches dynamic route pattern
        if (generatedPattern.test(path)) {
          return "Generate Schedule";
        }
        // Fallback for unknown paths
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
