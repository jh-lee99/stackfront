import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import { handleLoginSuccess } from '../controller/loginsucess';

const Dropdown = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios({
        url: "http://localhost:3000/logout",
        method: "POST",
      });
      console.log("logout success");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.reload();
    } catch (err) {
      console.log("이미 로그아웃 되었습니다.", err);
    }
  };
  return (
    //TravelHeader에 필요한 드롭다운 생성
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* 유저 이름 출력 */}
        {Cookies.get("username")}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            onClick={async() => {
              // 회원정보 수정 버튼 클릭 시 처리 로직
              // /registerupdate 로 이동
              await handleLoginSuccess().then(() => {
                navigate("/registerupdate")
              }).catch(() => {
                alert("로그인 이후 이용해주세요!")
              })
            }}
          >
            회원정보 수정
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              // 최근 메시지 표시 버튼 클릭 시 처리 로직
              // /resentmessage/1 로 이동
              navigate("/recentmessage");
            }}
          >
            최근 메시지 표시
          </button>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              // 로그아웃 버튼 클릭 시 처리 로직
              logout();
            }}
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
