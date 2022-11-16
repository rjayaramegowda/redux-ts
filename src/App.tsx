import { Col, Container, Row } from "react-bootstrap";
import TodoTable from "./components/todos/TodoTable";

const App = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="bg-light vh-100" md="2"></Col>
          <Col>
            <Container>
              <Row className="mt-5">
                <TodoTable />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
