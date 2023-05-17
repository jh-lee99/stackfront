import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import UpdateUser from "./pages/UpdateUser";
import RecentMessage from "./pages/RecentMessage";

const App = () => {
  const navigate = useNavigate();
  // 모든 axios 요청 생성에서 전역적으로 사용되는 인터셉트.
  // axios.interceptors.request.use(
  //   async (config) => {
  //     console.log("interceptor start.");
  //       try {
  //         const response = await fetch(
  //           "http://localhost:3000/api/token/verify",{
  //             withCredentials: true
  //           }
  //         );
  //         const data = await response.json();
  //         console.log(data);}
  //         catch (error){console.log(error);}}
  //   //       // 아직 유효하면 200을 반환함
  //   //       if (response.ok) {
  //   //         console.log("Access token is still valid");
  //   //       } else {
  //   //         console.log("Access token is expired");

  //   //         // 토큰을 재생성하는 코드가 들어가야함
  //   //         console.log("access refresh Token.");
  //   //         const response = await fetch(
  //   //           "http://localhost:3000/api/token/refresh",
  //   //           {
  //   //             method: "POST",
  //   //             headers: {
  //   //               "Content-Type": "application/json",
  //   //             },
  //   //             body: JSON.stringify({ refreshToken }),
  //   //           }
  //   //         );
  //   //         // 리프레쉬 토큰이 살아있을 때
  //   //         if (response.ok) {
  //   //           const { accessToken: newAccessToken } = await response.json();
  //   //           Cookies.set("accessToken", newAccessToken);
  //   //           config.headers.Authorization = `Bearer ${newAccessToken}`;
  //   //         } else {
  //   //           throw new Error("토큰이 없습니다.");
  //   //         }
  //   //       }
  //   //       console.log("status: ", response.status);
  //   //     } catch (error) {
  //   //       Cookies.remove("username");
  //   //       Cookies.remove("email");
  //   //       Cookies.remove("accessToken");
  //   //       Cookies.remove("refreshToken");
  //   //       console.error("Failed to check access token", error);
  //   //       alert("세션이 끊겼습니다.\n로그아웃합니다.");
  //   //       navigate("/", { replace: true });
  //   //     } finally {
  //   //       console.log("accessToken: ", Cookies.get("accessToken"));
  //   //     }
  //   //   }
  //   //   return config;
  //   // },
  //   // (error) => {
  //   //   console.log("no accessToken");
  //   //   return Promise.reject(error);
  //   // }
  // );

  // useEffect(() => {
  //   try {
  //     axios({
  //       url: "http://localhost:3000/login/success",
  //       method: "GET",
  //       withCredentials: true,
  //     })
  //       .then((res) => {
  //         console.log("have accessToken", res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         console.log("Err: ", err.message);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

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
