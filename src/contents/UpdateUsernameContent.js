import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectupdate, updateUserpassword } from "../Reducer/UpdateUserReducer";
import Cookies from "js-cookie";
const UpdateUsernameContent = () => {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const modeState = useSelector((state) => state.UpdateUserReducer.mode);
  const username = Cookies.get("username");
  const email = Cookies.get("email");

  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    setNewUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitUsername = () => {
    console.log(email, password, username, newUsername);
    axios
      .post("http://localhost:3000/update/user", {
        email: email,
        password: password,
        username: username,
        newUsername: newUsername,
      })
      .then((res) => {
        console.log("res.data", res.data);
        if(res.status === 200) {
          Cookies.set("username", res.data.username)
          window.location.reload();
        }
          else
          console.log("실패하였습니다.");
      })
      .catch((err) => {
        console.log("err", err);
      });
    setNewUsername("");
    setPassword("");
  };

  return (
    <Container>
      <Form id="Form">
        <Form.Group>
          <Form.Label>
            <h1 className="my-5">Username 변경</h1>
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username 변경</Form.Label>
          <Form.Control
            type="text"
            value={newUsername}
            onChange={onChangeUsername}
            placeholder="Username"
            className="my-2"
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "5%" }}>
          <Form.Label>Password 확인</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
            className="my-2"
          />
        </Form.Group>
        <Button
          variant="info"
          onClick={() => {
            submitUsername();
          }}
        >
          Username 변경하기
        </Button>
      </Form>
      <Button
        variant="info"
        onClick={() => {
          dispatch(selectupdate());
        }}
      >
        메인으로 돌아가기
      </Button>
      <Button
        variant="info"
        onClick={() => {
          dispatch(updateUserpassword());
        }}
      >
        Password 변경하기
      </Button>
    </Container>
  );
};

export default UpdateUsernameContent;
