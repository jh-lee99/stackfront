import React from "react";
import Layout from "../layouts/Layout";
import { Container } from "react-bootstrap";
import GptApiContent from "../contents/GptApiContent";

const Travel = () => {
  return (
    <Layout>
      <Container>
        <GptApiContent />
      </Container>
    </Layout>
  );
};

export default Travel;
