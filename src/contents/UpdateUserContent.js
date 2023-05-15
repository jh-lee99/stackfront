import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import {
  updateUsername,
  updateUserpassword,
  selectupdate,
} from "../Reducer/UpdateUserReducer";
import { useDispatch, useSelector } from "react-redux";
const UpdateUserContent = () => {
  const modeState = useSelector((state) => state.UpdateUserReducer.mode);
  const dispatch = useDispatch();
  return (
    <Container>
      <Form id="Form">
        <Form.Group>
          <Form.Label>
            <h1 className="my-5">회원정보 수정</h1>
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username 변경</Form.Label>

          {/*<Form.Control
            type="text"
            value={ModifiedId}
            onChange={onChangeModifiedId}
            placeholder="Username"
            className="my-2"
  />*/}
        </Form.Group>
        <Button
          variant="info"
          style={{ marginBottom: "5%" }}
          onClick={() => {
            dispatch(updateUsername());
          }}
        >
          Username 변경하기
        </Button>
        <Form.Group>
          <Form.Label>Password 변경</Form.Label>
          {/*<Form.Control
            type="password"
            placeholder="비밀번호"
            value={ModifiedPassword}
            onChange={onChangeModifiedPassword}
            className="my-2"
          />
          <div className="errorMessageWrap">
            {!mpwValid &&
              ModifiedPassword.length > 0 &&
              ModifiedPassword.length < 21 && (
                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
              )}
            {!mpwValid && ModifiedPassword.length > 20 && (
              <div>20자 이하로 입력해 주세요.</div>
            )}
            </div>*/}
        </Form.Group>
        <Button
          variant="info"
          onClick={() => {
            dispatch(updateUserpassword());
          }}
        >
          Password 변경하기
        </Button>

        {/*<Form.Group>
          <Form.Label>Password 변경 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            value={ConfirmModifiedPassword}
            onChange={onChangeConfirmModifiedPassword}
            className="my-2"
          />
          <div className="errorMessageWrap">
            {!(ModifiedPassword === ConfirmModifiedPassword) &&
              ConfirmModifiedPassword.length > 0 && (
                <div>입력하신 비밀번호와 일치하지 않습니다.</div>
              )}
          </div>
              </Form.Group>*/}
        {/*<Button
          block
          variant="info"
          type="button"
          className="my-3"
          id="fullBtn"
          onClick={() => {
            updateUserEdit();
          }}
        >
          Edit
        </Button>*/}
      </Form>
    </Container>
  );
};

export default UpdateUserContent;
