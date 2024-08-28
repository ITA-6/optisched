import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";

import Admin from "./components/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard"
import User from "./components/Admin/User/User"
import Professor from "./components/Admin/Management/Professors";
import Section from "./components/Admin/Management/Section";
import Classroom from "./components/Admin/Management/Classroom";
import Course from "./components/Admin/Management/Courses";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* ADMIN */}
        <Route path="admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="user" element={<Navigate to="manage" />} />
            <Route index path="user/manage" element={<User/>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="management/professor" element={<Professor />} />
            <Route path="management/section" element={<Section />} />
            <Route path="management/classroom" element={<Classroom />} />
            <Route path="management/course" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
