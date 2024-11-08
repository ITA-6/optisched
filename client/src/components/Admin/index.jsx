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
