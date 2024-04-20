"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { setUser, setAccessToken, setAccountInfo, setIsAuthenticated, setIsLoading } from "@/redux/slices/authSlice";
import { useAuthLogger } from "@/hooks/useAuthLogger";

interface AuthContextValue {
  login: (email: string, password: string) => Promise<string | undefined>;
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
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpire");
    dispatch(setAccessToken(null));
    dispatch(setUser(null));
    dispatch(setAccountInfo(null));
    dispatch(setIsAuthenticated(false));
    setIsAuthChecked(true);
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
        setIsAuthChecked(true);
      } catch (error: any) {
        console.error("Не удалось получить информацию пользователя: ", error);
        logout();
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
        router.push("/");
        return "Успешный вход";
      } catch (error: any) {
        console.error("Ошибка входа: ", error.response?.data || error);
        dispatch(setIsLoading(false));
        return "Неправильный логин или пароль";
      }
    },
    [dispatch, getUserInfo, router]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const tokenExpire = localStorage.getItem("tokenExpire");
    const isTokenValid = storedToken && tokenExpire && new Date() < new Date(tokenExpire);
    if (isTokenValid) {
      dispatch(setAccessToken(storedToken));
      dispatch(setIsAuthenticated(true));
    } else if (storedToken) {
      logout();
    }
  }, [dispatch, logout]);

  useAuthLogger(isAuthenticated, isAuthChecked);

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
