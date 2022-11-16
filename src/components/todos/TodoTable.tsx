import * as React from "react";
import { Button, Col, Table } from "react-bootstrap";
import {
  useDeleteTodoMutation,
  useTodosQuery,
} from "../../reducers/api/todosApi";

interface ITodoTableProps {}

const TodoTable: React.FunctionComponent<ITodoTableProps> = (props) => {
  const { data, error, isLoading, isFetching, isSuccess } = useTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();

  function deleteHandler(id: number) {
    deleteTodo(id);
  }

  return (
    <Col sm="12">
      {error && <p>Error Occurred</p>}
      {(isFetching || isLoading) && <p>Loading..</p>}
      {isSuccess && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>User Id</th>
              <th>Is Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.userId}</td>
                  <td>{todo.completed ? "true" : "false"}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="rounded-pill px-3 me-2"
                      size="sm"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      className="rounded-pill px-3"
                      size="sm"
                      onClick={() => deleteHandler(todo.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Col>
  );
};

export default TodoTable;
