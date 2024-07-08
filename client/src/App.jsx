import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      {/* LOGIN */}
      <Routes path="/" element={<Login />}>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
