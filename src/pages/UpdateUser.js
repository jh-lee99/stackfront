import React from "react";

import Layout from "../layouts/Layout";
import RegisterContent from "../contents/UpdateUserContent";
import { Container } from "react-bootstrap";
const UpdateUser = () => {
  return (
    <Layout>
      <Container>
        <RegisterContent />
      </Container>
    </Layout>
  );
};

export default UpdateUser;
