import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../models/todo.model";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
  endpoints: (builder) => ({
    todos: builder.query<Todo[], void>({
      query: () => "/todos",
    }),
    todo: builder.query<Todo, string>({
      query: (id) => `/todos/${id}`,
    }),
    deleteTodo: builder.mutation<Todo, string>({
      query(id) {
        return {
          url: `todos/${id}`,
          method: "DELETE",
        };
      },
    }),
    addTodo: builder.mutation<void, Todo>({
      query(todo) {
        return {
          url: `todos`,
          method: "POST",
          body: todo,
        };
      },
    }),
  }),
});

export const {
  useTodosQuery,
  useTodoQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
} = todosApi;
