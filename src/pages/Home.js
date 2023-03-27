import React from "react";
import Layout from "../layouts/Layout";
import { Container } from "react-bootstrap";
import Intrioduction from "../layouts/Introduction";

const Home = () => {
  return (
    <Layout>
      <Container style={{ minHeight: "75vh" }}>
        <Intrioduction />
      </Container>
    </Layout>
  );
};

export default Home;
