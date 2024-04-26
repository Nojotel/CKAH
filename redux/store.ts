import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice"; // Импортируйте searchReducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer, // Добавьте этот reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
