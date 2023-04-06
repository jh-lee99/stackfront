import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import RegisterUpdate from "./pages/RegisterUpdate";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/travel" element={<Travel />} />
        <Route path="/registerUpdate" element={<RegisterUpdate />} />
      </Routes>
    </div>
  );
};

export default App;
