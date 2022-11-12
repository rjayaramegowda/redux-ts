import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../models/todo.model";
import { todosApi } from "../api/todosApi";

export interface TodoState {
  todoList: Todo[];
  status: "idle" | "loading" | "failed";
}

const initialState: TodoState = {
  todoList: [],
  status: "idle",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    loadTodos: (state) => {
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      //add Matches for todos
      .addMatcher(todosApi.endpoints.todos.matchFulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = "idle";
      })
      .addMatcher(todosApi.endpoints.todos.matchPending, (state, action) => {
        state.status = "loading";
      })
      .addMatcher(todosApi.endpoints.todos.matchRejected, (state, action) => {
        state.todoList = [];
        state.status = "failed";
      });
  },
});

export const { loadTodos } = todoSlice.actions;

export default todoSlice.reducer;
