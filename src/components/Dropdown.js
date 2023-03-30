import React from "react";
import RegisterUpdate from "../pages/RegisterUpdate";
import TravelLayout from "../layouts/TravelLayout";

const Dropdown = () => {
  return (
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        닉네임 표시
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="/RegisterUpdate">
            회원정보 수정
          </a>
        </li>
        <li>
          <a class="dropdown-item">최근 메시지 표시</a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a class="dropdown-item" href="#">
            로그아웃
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
