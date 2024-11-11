import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Sidenav/Header";
import Sidenav from "./Sidenav/Sidenav";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode"
const SubAdmin = () => {
  const location = useLocation();
  const generatedPattern = /^\/admin\/generated\/[^/]+$/; // Matches /admin/generated/:name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token === null) navigate("/login");


    if(token !== null  && jwtDecode(token).user_type === "D" || token !== null  &&  jwtDecode(token).user_type === "DC"  ){
      navigate("/sub-admin")
    }else {
      navigate("/unauthorized")
    }
  }, []);

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
        return "Manage Sections";
      case "/sub-admin/management/course":
        return "MANAGE COURSE";
      case "/sub-admin/management/building":
        return "MANAGE BUILDING";
      case "/admin/curriculum":
        return "Curriculum";
      case "/sub-admin/management/program":
        return "MANAGE PROGRAM";
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
