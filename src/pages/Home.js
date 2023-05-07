import React from "react";
import Layout from "../layouts/Layout";
import { Container } from "react-bootstrap";
import Intro from "../layouts/Intro";

const Home = () => {
  return (
    <Layout>
      <Container style={{ minHeight: "70vh" }}>
        <Intro />
      </Container>
    </Layout>
  );
};

export default Home;
