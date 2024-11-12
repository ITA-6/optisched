import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const Users = () => {
  const location = useLocation();
  const generatedPattern = /^\/admin\/generated\/[^/]+$/; // Matches /admin/generated/:name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // Check if the token exists
    if (!token) {
      navigate("/"); // Redirect to home if token is missing
      return;
    }

    try {
      const userType = jwtDecode(token).user_type;

      // Redirect based on user type
      if (userType === "VPAA") {
        navigate("/user/vpaa");
      } else if (userType === "P" && userType !== "VPAA") {
        navigate("/user/professor");
      } else {
        navigate("/unauthorized");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/unauthorized"); // Redirect to unauthorized if token decoding fails
    }
  }, [navigate]);

  const getPageName = (path) => {
    switch (path) {
      case "/admin":
      case "/admin/dashboard":
        return "Admin Dashboard";
      case "/admin/user/manage":
        return "Manage Users";
      case "/admin/management/professor":
        return "Manage Professors";
      case "/admin/management/section":
        return "Manage Sections";
      case "/admin/management/classroom":
        return "Manage Classrooms";
      case "/admin/generate":
        return "Generate";
      case "/admin/curriculum":
        return "Curriculum";
      case "/admin/management/building":
        return "Manage Building";
      case "/admin/management/department":
        return "Manage College";
      case "/admin/management/course":
        return "Manage Courses";
      case "/admin/management/program":
        return "Manage Programs";
      case "/admin/generated/":
        return "Generate Schedule";
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

export default Users;
