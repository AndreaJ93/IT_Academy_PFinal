import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./apiSlice";
import userReducer from "./userSlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
