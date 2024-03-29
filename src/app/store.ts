import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoReducer from "../reducers/slice/todoSlice";
import { todosApi } from "../reducers/api/todosApi";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
