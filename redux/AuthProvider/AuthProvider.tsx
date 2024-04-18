"use client";
import React, { createContext, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser, setAccessToken, setAccountInfo, setIsAuthenticated, setIsLoading } from "@/redux/slices/authSlice";
import { useAuthLogger } from "@/hooks/useAuthLogger";

interface AuthContextValue {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUserInfo: (token: string) => Promise<void>;
  user: any;
  accessToken: string | null;
  accountInfo: any;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpire");
    dispatch(setAccessToken(null));
    dispatch(setUser(null));
    dispatch(setAccountInfo(null));
    dispatch(setIsAuthenticated(false));
  }, [dispatch]);

  const getUserInfo = useCallback(
    async (token: string) => {
      dispatch(setIsLoading(true));
      try {
        const response = await axios.get("https://gateway.scan-interfax.ru/api/v1/account/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(response.data.user || null));
        dispatch(setAccountInfo(response.data.eventFiltersInfo || null));
        dispatch(setIsAuthenticated(true));
      } catch (error: any) {
        if (error.response && error.response.data.errorCode === "Auth_InvalidAccessToken") {
          console.error("Неправильный токен доступа, выполняем выход из системы");
          logout();
        } else {
          console.error("Не удалось получить информацию пользователя: ", error);
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, logout]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      dispatch(setIsLoading(true));
      try {
        const response = await axios.post("https://gateway.scan-interfax.ru/api/v1/account/login", {
          login: email,
          password: password,
        });
        const { accessToken, expire } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("tokenExpire", expire);

        dispatch(setAccessToken(accessToken));
        await getUserInfo(accessToken);
      } catch (error: any) {
        console.error("Ошибка входа: ", error.response?.data || error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, getUserInfo]
  );

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("accessToken");
      const tokenExpire = localStorage.getItem("tokenExpire");

      if (storedToken && tokenExpire && new Date() < new Date(tokenExpire)) {
        dispatch(setAccessToken(storedToken));
        if (!accessToken) {
          await getUserInfo(storedToken);
        }
      } else if (storedToken) {
        console.log("Токен истек или отсутствует, выполняем выход из системы");
        logout();
      }
    };

    initAuth();
  }, [dispatch, getUserInfo, logout, accessToken]);

  useAuthLogger(isAuthenticated, true);

  const value = {
    login,
    logout,
    getUserInfo,
    user: useSelector((state: RootState) => state.auth.user),
    accessToken,
    accountInfo: useSelector((state: RootState) => state.auth.accountInfo),
    isAuthenticated,
    isLoading: useSelector((state: RootState) => state.auth.isLoading),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
