import React, { createContext, useState, ReactNode } from "react";
import { login as apiLogin } from "./api";
import { useRouter } from "next/router";

interface AuthContextValue {
  accessToken: string | null;
  expire: Date | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  expire: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [expire, setExpire] = useState<Date | null>(null);

  const loginHandler = async (login: string, password: string) => {
    try {
      const response = await apiLogin(login, password);
      const { accessToken, expire } = response;
      setAccessToken(accessToken);
      setExpire(new Date(expire));
      router.push("/search");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setExpire(null);
    router.push("/login");
  };

  const value: AuthContextValue = {
    accessToken,
    expire,
    login: loginHandler,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
