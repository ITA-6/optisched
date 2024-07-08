import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      {/* LOGIN */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
