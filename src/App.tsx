import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Todos from "./components/Todos";

const App = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md="3">Side Nav</Col>
          <Col>
            <Todos />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
