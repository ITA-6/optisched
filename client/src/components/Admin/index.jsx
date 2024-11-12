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

    if (token === null) {
      navigate("/");
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.user_type === "R") {
        navigate("/admin");
      } else {
        navigate("/unauthorized");
      }
    }
  },[]);

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
