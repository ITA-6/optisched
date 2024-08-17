import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

import Admin from "./components/Admin";
import Dashboard from "./components/Admin/Dashboard";

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
          <Route index path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
