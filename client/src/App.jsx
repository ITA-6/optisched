import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./components/Users/Sidenav/SidenavContext/SidenavContext";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import User from "./components/Admin/User/User";
import Generate from "./components/Admin/Generate/Generate";
import Curriculum from "./components/Admin/Curriculum/Curriculum";
import ViewProfessor from "./components/Admin/ViewManagement/Professor";
import ViewSection from "./components/Admin/ViewManagement/Section";
import ViewClassroom from "./components/Admin/ViewManagement/Classroom";
import ViewCourse from "./components/Admin/ViewManagement/Course";
import ViewDepartment from "./components/Admin/Department";
import ViewProgram from "./components/Admin/ViewManagement/Program";
import ViewBuilding from "./components/Admin/ViewManagement/Building";
import Constraint from "./components/Admin/Constraint";
import SubAdmin from "./components/SubAdmin/index";
import Buildings from "./components/SubAdmin/Management/Building/Building";
import Professors from "./components/SubAdmin/Management/Professor";
import Sections from "./components/SubAdmin/Management/Section";
import Classrooms from "./components/SubAdmin/Management/Classroom";
import Courses from "./components/SubAdmin/Management/Course";
import Programs from "./components/SubAdmin/Management/Program";
import Users from "./components/Users/";
import GenerateUser from "./components/Users/Generate";
import Schedule from "./components/Users/MySchedule";
import Unauthorized from "./components/Error/Unauthorized/Unauthorized";
import Notfound from "./components/Error/Notfound/Notfound";
import PrintSchedule from "./components/Users/PrintSchedule";
import CurriculumView from "./components/Admin/Curriculum/Files/CurriculumView";
import Vpaa from "./components/Users/ViewVPAA";
import PasswordChange from "./components/Password/index";
import Forbidden from "./components/Error/Forbidden";

const App = () => {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="login" element={<Login />} />

          {/* ADMIN */}
          <Route path="admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="user" element={<Navigate to="manage" />} />
            <Route path="user/manage" element={<User />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="generate" element={<Generate />} />
            <Route path="curriculum" element={<Curriculum />} />
            <Route path="view/professor" element={<ViewProfessor />} />
            <Route path="view/section" element={<ViewSection />} />
            <Route path="view/classroom" element={<ViewClassroom />} />
            <Route path="view/course" element={<ViewCourse />} />
            <Route path="view/college" element={<ViewDepartment />} />
            <Route path="view/program" element={<ViewProgram />} />
            <Route path="view/building" element={<ViewBuilding />} />
            <Route path="view/constraint" element={<Constraint />} />
            <Route path="curriculum/program" element={<CurriculumView />} />
            <Route path="changepassword" element={<PasswordChange />} />
          </Route>

          {/* Sub Admin */}
          <Route path="sub-admin" element={<SubAdmin />}>
            <Route index element={<Professors />} />
            <Route path="management/building" element={<Buildings />} />
            <Route path="management/professor" element={<Professors />} />
            <Route path="management/section" element={<Sections />} />
            <Route path="management/classroom" element={<Classrooms />} />
            <Route path="management/course" element={<Courses />} />
            <Route path="management/program" element={<Programs />} />
          </Route>

          {/* User routes */}
          <Route path="User" element={<Users />}>
            <Route index element={<GenerateUser />} />
            <Route path="professor/generate" element={<GenerateUser />} />
            <Route path="professor/schedule" element={<Schedule />} />
            <Route path="vpaa" element={<Vpaa />} />
          </Route>

          <Route path="forbidden" element={<Forbidden />} />
          <Route path="Unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
};

export default App;
