import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { handleLoginSuccess } from "../controller/loginsucess";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../Reducer/UserNameReducer";

const Dropdown = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.UserNameReducer.username);
  const dispatch = useDispatch();

  const logout = () => {
    axios({
      url: "http://localhost:3000/logout",
      method: "POST",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
        dispatch(setUsername(""));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
        {username}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            onClick={async () => {
              // 회원정보 수정 버튼 클릭 시 처리 로직
              // /registerupdate 로 이동
              await handleLoginSuccess()
                .then(() => {
                  navigate("/registerupdate");
                })
                .catch(() => {
                  alert("로그인 이후 이용해주세요!");
                });
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
