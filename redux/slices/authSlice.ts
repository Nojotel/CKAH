import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountInfo {
  companyLimit: number;
  usedCompanies: number;
}

interface User {
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  accountInfo: AccountInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  accountInfo: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setAccountInfo: (state, action: PayloadAction<AccountInfo | null>) => {
      state.accountInfo = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setAccessToken, setAccountInfo, setIsAuthenticated, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
