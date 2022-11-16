import * as React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
} from "../../reducers/api/todosApi";
interface ITodoFormProps {}

const TodoForm: React.FunctionComponent<ITodoFormProps> = (props) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [userId, setUserId] = useState("");

  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      console.log("Submit form");
    }

    addTodo({
      userId: 1,
      id: 4,
      title: "Pay electricity bill",
      completed: false,
    });

    setValidated(true);
  };

  const handleDelete = () => {
    deleteTodo("3");
  };

  return (
    <>
      <h1 className="mt-5"> Add Todo</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter title"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type="number"
            placeholder="Enter user id"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked ? true : false)}
            type="checkbox"
            label="Is Completed"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default TodoForm;
