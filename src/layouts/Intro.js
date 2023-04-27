import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const loginLink = () => {
    navigate("/travel");
  };
  const userEditLink = () => {
    navigate("/registerUpdate");
  };
  return (
    <div>
      <div className="introText">첫 접속시 표시되는 화면입니다.</div>
      <div className="introBox">
        <Button
          href="#"
          onClick={() => {
            userEditLink();
          }}
          variant="info"
          className="introBtn"
        >
          회원정보 수정하기
        </Button>

        <Button
          href="#"
          onClick={() => {
            loginLink();
          }}
          variant="info"
          className="introBtn"
        >
          로그인 이후 화면 이동하기
        </Button>
      </div>
    </div>
  );
};

export default Intro;
