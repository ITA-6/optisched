import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";

const SubAdmin = () => {
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

export default SubAdmin;
