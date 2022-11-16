import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../models/todo.model";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    todos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    todo: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
    }),
    deleteTodo: builder.mutation<void, number>({
      query(id) {
        return {
          url: `todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Todo"],
    }),
    addTodo: builder.mutation<void, Todo>({
      query(todo) {
        return {
          url: `todos`,
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useTodosQuery,
  useTodoQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
} = todosApi;
