import React from "react";
import Layout from "../layouts/Layout";
import { Container } from "react-bootstrap";
import GptApiContents from "../layouts/GptApiContent";

const Home = () => {
  return (
    <Layout>
      <Container style={{ minHeight: "75vh" }}>
        <GptApiContents />
      </Container>
    </Layout>
  );
};

export default Home;
