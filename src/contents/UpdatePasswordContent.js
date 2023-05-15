import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { selectupdate } from "../Reducer/UpdateUserReducer";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const UpdatePasswordContent = () => {
  const modeState = useSelector((state) => state.UpdateUserReducer.mode);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmNewpassword, setConfirmNewpassword] = useState("");
  const [mpwValid, setMpwValid] = useState(false);
  const userpassword = Cookies.get("password");
  const email = Cookies.get("email");

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setMpwValid(true);
    } else setMpwValid(false);
  };
  const onChangeNewpassword = (e) => {
    setNewpassword(e.target.value);
  };
  const onChangeConfirmNewpassword = (e) => {
    setConfirmNewpassword(e.target.value);
  };

  const submitPassword = () => {
    if (password === userpassword) {
      // 쿠키에 저장된 비밀번호와 현재 비밀번호 입력창에 입력한 비밀번호가 같을때
      console.log(email, password);
      axios
        .post("http://localhost:3000/update/password", {
          email: email,
          password: password,
          newpassword: newpassword,
        })
        .then((res) => {
          console.log("res.data", res.data);
          if (res.status === 200) {
            Cookies.set("password", res.data.password);
            window.location.reload();
            alert("비밀번호가 변경되었습니다!");
            dispatch(selectupdate());
          } else console.log("실패하였습니다.");
        })
        .catch((err) => {
          console.log("err", err);
        });
      setPassword("");
      setNewpassword("");
      setConfirmNewpassword("");
    } else alert("비밀번호가 일치하지 않습니다.");
  };
  return (
    <Container>
      <Form id="Form">
        <Form.Group>
          <Form.Label>
            <h1 className="my-5">Password 변경</h1>
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password 입력하기</Form.Label>
        </Form.Group>
        <Form.Control
          type="password"
          placeholder="CurrentPassword"
          value={password}
          onChange={onChangePassword}
          className="my-2"
        />
        <Form.Group>
          <Form.Label>Password 변경하기</Form.Label>
        </Form.Group>
        <Form.Control
          type="password"
          placeholder="NewPassword"
          value={newpassword}
          onChange={onChangeNewpassword}
          className="my-2"
        />
        <div className="errorMessageWrap">
          {!mpwValid && newpassword.length > 0 && newpassword.length < 21 && (
            <div style={{ marginBottom: "3%" }}>
              영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
            </div>
          )}
          {!mpwValid && newpassword.length > 20 && (
            <div style={{ marginBottom: "3%" }}>20자 이하로 입력해 주세요.</div>
          )}
        </div>
        <Form.Group>
          <Form.Label>Password 변경확인</Form.Label>
        </Form.Group>
        <Form.Control
          type="password"
          placeholder="NewPassword"
          value={confirmNewpassword}
          onChange={onChangeConfirmNewpassword}
          className="my-2"
        />
        <div className="errorMessageWrap">
          {newpassword !== confirmNewpassword && (
            <div style={{ marginBottom: "3%" }}>
              입력하신 비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>
        <Button
          variant="info"
          onClick={() => {
            submitPassword();
          }}
          style={{ marginTop: "3%" }}
        >
          Password 변경하기
        </Button>
      </Form>
      <Button
        variant="info"
        style={{ marginBottom: "5%" }}
        onClick={() => {
          dispatch(selectupdate());
        }}
      >
        메인으로 돌아가기
      </Button>
    </Container>
  );
};

export default UpdatePasswordContent;
