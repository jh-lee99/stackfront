import React from "react";
import Layout from "../layouts/Layout";
import { Container } from "react-bootstrap";
import MessageContent from "../contents/MessageContent";

const RecentMessage = () => {
  return (
    <Layout>
      <Container>
        <MessageContent />
      </Container>
    </Layout>
  );
};

export default RecentMessage;
