import { useEffect } from "react";

export const useAuthLogger = (isAuthenticated: boolean, isAuthChecked: boolean) => {
  useEffect(() => {
    if (isAuthChecked) {
      console.log("Пользователь аутентифицирован:", isAuthenticated);
    }
  }, [isAuthenticated, isAuthChecked]);
};
