import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route index path="user" element={<User />} />
          <Route index path="dashboard" element={<Dashboard />} />
          <Route index path="Professor" element={<Professor />} />
          <Route index path="Section" element={<Section />} />
          <Route index path="Classroom" element={<Classroom />} />
          <Route index path="Course" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
