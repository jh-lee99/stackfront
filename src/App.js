import axios from "axios";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import RegisterUpdate from "./pages/RegisterUpdate";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState('');
  
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

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
          if (refreshToken && !accessToken) {
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
              console.error(error);
            } finally {
              console.log('accessToken: ', Cookies.get(accessToken));
            }
          }
        }
      } catch (error) {
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
