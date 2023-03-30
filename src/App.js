import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </div>
  );
};

export default App;
/*let isAuthorized = sessionStorage.getItem("isAuthorized");
/*{!isAuthorized ? <redirect to="/travel" /> : <redirect to="/" />}*/
