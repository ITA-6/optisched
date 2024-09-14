import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";

import Admin from "./components/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import User from "./components/Admin/User/User";
import Generate from "./components/Admin/Generate/Generate";
import Generated from "./components/Admin/Generate/generatedForms/Generated";
import Curriculum from "./components/Admin/Curriculum/Curriculum";
import Professor from "./components/Admin/Management/Professors";
import Section from "./components/Admin/Management/Section";
import Classroom from "./components/Admin/Management/Classroom";
import Course from "./components/Admin/Management/Course";
import Building from "./components/Admin/Management/Building";
import Department from "./components/Admin/Management/Department";
import Program from "./components/Admin/Management/Program";

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
          <Route path="management/professor" element={<Professor />} />
          <Route path="management/section" element={<Section />} />
          <Route path="management/classroom" element={<Classroom />} />
          <Route path="management/course" element={<Course />} />
          <Route path="management/building" element={<Building />} />
          <Route path="management/department" element={<Department />} />
          <Route path="management/program" element={<Program />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
