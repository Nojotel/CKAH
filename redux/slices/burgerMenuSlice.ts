// slices/burgerMenuSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BurgerMenuState {
  isOpen: boolean;
}

const initialState: BurgerMenuState = {
  isOpen: false,
};

const burgerMenuSlice = createSlice({
  name: "burgerMenu",
  initialState,
  reducers: {
    toggleBurgerMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeBurgerMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleBurgerMenu, closeBurgerMenu } = burgerMenuSlice.actions;
export default burgerMenuSlice.reducer;
