import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";
import GptApiContents from './layouts/GptApiContent';

function App() {
  return (
    <Layout>
      <Container style={{ minHeight: "75vh" }}>
        <GptApiContents/>
      </Container>
    </Layout>
  );
}

export default App;
