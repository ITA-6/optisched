import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";

const Admin = () => {
  const location = useLocation();
  const generatedPattern = /^\/admin\/generated\/[^/]+$/; // Matches /admin/generated/:name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
  }, []);

  const getPageName = (path) => {
    switch (path) {
      case "/admin":
      case "/admin/dashboard":
        return "Admin Dashboard";
      case "/admin/user/manage":
        return "Manage Users";
      case "/admin/view/professor":
        return "Manage Professors";
      case "/admin/view/section":
        return "Manage Sections";
      case "/admin/viewt/classroom":
        return "Manage Classrooms";
      case "/admin/generate":
        return "Generate";
      case "/admin/curriculum":
        return "Curriculum";
      case "/admin/view/building":
        return "Manage Building";
      case "/admin/view/department":
        return "Manage College";
      case "/admin/view/course":
        return "Manage Courses";
      case "/admin/view/program":
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

export default Admin;
