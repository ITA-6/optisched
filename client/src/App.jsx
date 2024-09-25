import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";

// admin Imports
import Admin from "./components/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import User from "./components/Admin/User/User";
import Generate from "./components/Admin/Generate/Generate";
import Generated from "./components/Admin/Generate/generatedForms/Generated";
import Curriculum from "./components/Admin/Curriculum/Curriculum";
import ViewProfessor from "./components/Admin/ViewManagement/Professor";
import ViewSection from "./components/Admin/ViewManagement/Section";
import ViewClassroom from "./components/Admin/ViewManagement/Classroom";
import ViewCourse from "./components/Admin/ViewManagement/Course";
import ViewDepartment from "./components/Admin/ViewManagement/Department";
import ViewProgram from "./components/Admin/ViewManagement/Program";
import ViewBuilding from "./components/Admin/ViewManagement/Building";
import Constraint from "./components/Admin/Constraint";


// sub Admin Imports
import SubAdmin from "./components/SubAdmin/index"
import Buildings from "../src/components/SubAdmin/Management/Building/Building"
import Professors from "./components/SubAdmin/Management/Professor";
import Sections from "./components/SubAdmin/Management/Section";
import Classrooms from "./components/SubAdmin/Management/Classroom";
import Courses from "./components/SubAdmin/Management/Course";
import Departments from "./components/SubAdmin/Management/Department";
import Programs from "./components/SubAdmin/Management/Program";

// User
import Users from "./components/Users/"
import GenerateUser from "./components/Users/Generate"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />

        {/* ADMIN */}
        <Route path="admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<Navigate to="manage" />} />
          <Route index path="user/manage" element={<User />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="generate" element={<Generate />} />
          <Route path="generated/:name" element={<Generated />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="view/professor" element={<ViewProfessor />} />
          <Route path="view/section" element={<ViewSection />} />
          <Route path="view/classroom" element={<ViewClassroom />} />
          <Route path="view/course" element={<ViewCourse />} />
          <Route path="view/department" element={<ViewDepartment />} />
          <Route path="view/program" element={<ViewProgram />} />
          <Route path="view/building" element={<ViewBuilding />} />
          <Route path="view/constraint" element={<Constraint />} />
        </Route>

          {/* Sub Admin Routes */}
        <Route path="sub-admin" element={<SubAdmin />}>
          <Route index element={<Professors/>} />
          <Route path="management/building" element={<Buildings/>} />
          <Route path="management/professor" element={<Professors />} />
          <Route path="management/section" element={<Sections />} />
          <Route path="management/classroom" element={<Classrooms />} />
          <Route path="management/course" element={<Courses />} />
          <Route path="management/department" element={<Departments />} />
          <Route path="management/program" element={<Programs />} />
        </Route>

        <Route path="User" element={<Users />} >
          <Route path="generate" element={<GenerateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
