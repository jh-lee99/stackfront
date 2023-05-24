import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import UpdateUser from "./pages/UpdateUser";
import RecentMessage from "./pages/RecentMessage";

const App = () => {
  // const navigate = useNavigate();
  // 모든 axios 요청 생성에서 전역적으로 사용되는 인터셉트.
  // axios.interceptors.request.use(
  //   async (config) => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/token/verify", {
  //         credentials: "include",
  //       });
  //       const userdata = await response.json().userdata;
  //       console.log("username:", userdata.username, "| email:", userdata.email);
  //       return config;
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/travel" element={<Travel />} />
        <Route path="/registerupdate" element={<UpdateUser />} />
        <Route path="/recentmessage" element={<RecentMessage />} />
      </Routes>
    </div>
  );
};

export default App;
