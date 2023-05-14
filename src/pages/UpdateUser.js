import React from "react";

import Layout from "../layouts/Layout";
import UpdateUserContent from "../contents/UpdateUserContent";
import { Container } from "react-bootstrap";
const UpdateUser = () => {
  return (
    <Layout>
      <Container>
        <UpdateUserContent />
      </Container>
    </Layout>
  );
};

export default UpdateUser;
