import axios from "axios";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import RegisterUpdate from "./pages/RegisterUpdate";

const App = () => {
  const navigate = useNavigate();
  
  // 모든 axios 요청 생성에서 전역적으로 사용되는 인터셉트.
  // 
  axios.interceptors.request.use(
    async (config) => {
      console.log("interceptor start.");
      let accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      console.log("get two token.");
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      try {
        const response = await fetch('http://localhost:3000/api/token/access', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
          const data = await response.json();
          console.log(data.message);
          // 아직 유효하면 200을 반환함
          if (response.ok) {
            console.log("Access token is still valid");
          } else {
            console.log("Access token is expired");
            Cookies.remove("accessToken");
            accessToken = Cookies.get('accessToken');
          console.log("accessToken removed");
        }
        if (!accessToken) {
          try {
            console.log("access refresh Token.");
            const response = await fetch('http://localhost:3000/api/token/refresh', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refreshToken }),
            });
            if (response.ok) {
              const { accessToken: newAccessToken } = await response.json();
              Cookies.set('accessToken', newAccessToken);
              config.headers.Authorization = `Bearer ${newAccessToken}`;
            } else {
              throw new Error('토큰이 없습니다.');
            }
          } catch (error) {
            Cookies.remove("refreshToken");
            if(Cookies.get("username")) {
              Cookies.remove("username");
              alert("세션이 끊겼습니다.\n로그아웃합니다.");
              navigate("/", { replace: true });
            }
            console.error(error);
          } finally {
            console.log('accessToken: ', Cookies.get("accessToken"));
          }
        }
      } catch (error) {
        Cookies.remove("refreshToken");
        Cookies.remove("username");
        console.error("쿠키를 전부 삭제함", error);
        console.error('Failed to check access token', error);
      }
      return config;
    },
    (error) => {
      console.log("no accessToken");
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:3000/login/success",
        method: "GET",
        withCredentials: true,
      })
      .then((res) => {
        console.log("have accessToken", res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Err: ", err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/travel" element={<Travel />} />
        <Route path="/registerupdate" element={<RegisterUpdate />} />
      </Routes>
    </div>
  );
};

export default App;
