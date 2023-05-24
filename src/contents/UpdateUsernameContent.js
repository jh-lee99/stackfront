import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectupdate, updateUserpassword } from "../Reducer/UpdateUserReducer";
import { setUsername } from "../Reducer/UserNameReducer";

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
    axios({
      url:"http://localhost:3000/update/user", 
      method:"post",
      withCredentials:true,
      data:{
        newUsername: newUsername,    
        password: password,
      }
    })
    .then((res) => {
      console.log("res.data", res.data);
      if (res.status === 200) {
        alert("username이 변경되었습니다!");
        dispatch(setUsername(res.data.username));
        window.location.reload();
      } 
    })
    .catch((err) => {
      alert(`${err.response.data.message}\n변경에 실패하였습니다.`);
      console.log(err);
    });
  setNewUsername("");
  setPassword("");
};
      
  return (
    <Container style={{ marginTop: "3%" }}>
      <Form id="Form" className="UpdateUserNameBox">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            id="exitBtn"
            variant="danger"
            onClick={() => {
              dispatch(selectupdate());
            }}
          >
            x
          </Button>
        </div>
        <Form.Group className="updateForm">
          <Form.Label>
            <h1 className="my-4">Username 변경</h1>
          </Form.Label>
        </Form.Group>
        <Form.Group className="updateForm">
          <Form.Label>Username 변경</Form.Label>
          <Form.Control
            id="radius"
            type="text"
            value={newUsername}
            onChange={onChangeUsername}
            placeholder="Username"
            className="my-2"
          />
        </Form.Group>
        <Form.Group className="updateForm">
          <Form.Label>Password 확인</Form.Label>
          <Form.Control
            id="radius"
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
            className="my-2"
          />
        </Form.Group>
        <Form.Group className="updateForm">
          <Button
            id="radius"
            className="fullBtn"
            variant="info"
            onClick={() => {
              submitUsername();
            }}
          >
            Username 변경하기
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UpdateUsernameContent;
