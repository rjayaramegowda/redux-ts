import { Col, Container, ListGroup, Row } from "react-bootstrap";
import TodoForm from "./components/todos/TodoForm";
import { todosDataProvider } from "./data/todoData";
import { Todo } from "./models/todo.model";

const App = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="bg-light vh-100" md="3">
            <ListGroup variant="flush" defaultActiveKey="#link1">
              {todosDataProvider.map((item: Todo, index: number) => (
                <ListGroup.Item key={index} action href={`#link${index}`}>
                  {item.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <Container>
              <Row>
                <TodoForm />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
