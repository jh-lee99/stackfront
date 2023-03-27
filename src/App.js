import { Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";

const App = () => {
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  return (
    <div>
      {!isAuthorized ? <redirect to="/travel" /> : <redirect to="/" />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </div>
  );
};

export default App;
