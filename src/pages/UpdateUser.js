import React from "react";

import Layout from "../layouts/Layout";
import UpdateUserContent from "../contents/UpdateUserContent";
import UpdateUsernameContent from "../contents/UpdateUsernameContent";
import UpdatePasswordContent from "../contents/UpdatePasswordContent";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
const UpdateUser = () => {
  const modeState = useSelector((state) => state.UpdateUserReducer.mode);

  function getContent() {
    if (modeState === "selectUpdate") {
      return <UpdateUserContent />;
    } else if (modeState === "updateUsername") {
      return <UpdateUsernameContent />;
    } else if (modeState === "updatePassword") {
      return <UpdatePasswordContent />;
    } else return <UpdateUserContent />;
  }

  return (
    <Layout>
      <Container>{getContent()}</Container>
    </Layout>
  );
};

export default UpdateUser;
