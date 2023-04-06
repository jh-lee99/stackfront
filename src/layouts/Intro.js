import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const loginLink = () => {
    navigate("/travel");
  };
  return (
    <div>
      <div className="introText">첫 접속시 표시되는 화면입니다.</div>
      <br />
      <a href="/RegisterUpdate">회원정보 수정 페이지 이동하기</a>
      <div>
        <Button
          href="#"
          onClick={() => {
            loginLink();
          }}
        >
          로그인 이후 화면 이동하기
        </Button>
      </div>
    </div>
  );
};

export default Intro;
