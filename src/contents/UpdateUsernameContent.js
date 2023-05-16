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

  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    setNewUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitUsername = () => {
    console.log(password, newUsername);
    axios
      .post("http://localhost:3000/update/user", {
        password: password,
        newUsername: newUsername,
      })
      .then((res) => {
        console.log("res.data", res.data);
        if (res.status === 200) {
          Cookies.set("username", res.data.username);
          alert("username이 변경되었습니다!");
          window.location.reload();
        } else console.log("실패하였습니다.");
      })
      .catch((err) => {
        console.log("err", err);
      });
    setNewUsername("");
    setPassword("");
  };

  return (
    <Container style={{ marginBottom: "3%" }}>
      <div className="UpdateBox">
        <div className="exit">
          <Button
            variant="danger"
            style={{
              marginBottom: "5%",
              height: "3vh",
              width: "3vh",
              padding: "0",
            }}
            onClick={() => {
              dispatch(selectupdate());
            }}
          >
            x
          </Button>
        </div>
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
      </div>
    </Container>
  );
};

export default UpdateUsernameContent;
