// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import burgerMenuReducer from "./slices/burgerMenuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    burgerMenu: burgerMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
