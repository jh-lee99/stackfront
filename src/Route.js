import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

/*const NotFound = () => {
  return <Link to="..">NotFound.... 돌아가기</Link>;
};*/

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Main" element={<Main />} />
    </Routes>
  );
};

export default Router;
