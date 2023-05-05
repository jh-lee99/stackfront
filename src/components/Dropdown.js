import React from "react";
import LoginModal from "../modals/LoginModal";

const Dropdown = (id) => {
  const token = localStorage.getItem("token");
  return (
    //TravelHeader에 필요한 드롭다운 생성
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        아이디 표시
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="/RegisterUpdate">
            회원정보 수정
          </a>
        </li>
        <li>
          <a className="dropdown-item">최근 메시지 표시</a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              console.log("click");
            }}
          >
            로그아웃
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
