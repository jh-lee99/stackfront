import React from "react";

import Layout from "../layouts/Layout";
import RegisterContent from "../layouts/RegisterContent";
import { Container } from "react-bootstrap";
const RegisterUpdate = () => {
  return (
    <Layout>
      <Container>
        <RegisterContent />
      </Container>
    </Layout>
  );
};

export default RegisterUpdate;
