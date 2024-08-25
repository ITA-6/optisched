import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

import Admin from "./components/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard"
import User from "./components/Admin/User/User"

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
