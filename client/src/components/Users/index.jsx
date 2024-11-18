import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const Users = () => {
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

        // Handle different user types
        if (decodedToken.user_type === "P") {
          navigate("/user", { replace: true });
        } else if (decodedToken.user_type === "VPAA") {
          navigate("/user/vpaa", { replace: true });
        } else if (!["P", "VPAA", "Admin"].includes(decodedToken.user_type)) {
          // If user type is not authorized
          navigate("/unauthorized", { replace: true });
        }
        // Otherwise, stay on the current page for Admin or other valid users
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/", { replace: true }); // Redirect to login if token is invalid
      }
    }
  }, []);

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
