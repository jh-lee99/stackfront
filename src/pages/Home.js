import React, { useEffect } from "react";
import Layout from "../layouts/Layout";
import { Container } from "react-bootstrap";
import IntroContent from "../contents/IntroContent";

const Home = () => {
  return (
    <Layout>
      <Container style={{ minHeight: "70vh" }}>
        <IntroContent />
      </Container>
    </Layout>
  );
};

export default Home;
