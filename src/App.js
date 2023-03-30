import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import RegisterUpdate from "./pages/RegisterUpdate";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/travel/RegisterUpdate" element={<RegisterUpdate />} />
      </Routes>
    </div>
  );
};

export default App;
/*let isAuthorized = sessionStorage.getItem("isAuthorized");
/*{!isAuthorized ? <redirect to="/travel" /> : <redirect to="/" />}*/
