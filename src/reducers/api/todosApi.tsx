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
  }),
});

export const { useTodosQuery, useTodoQuery } = todosApi;
