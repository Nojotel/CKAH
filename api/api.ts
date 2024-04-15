const API_BASE_URL = "https://gateway.scan-interfax.ru";

export const login = async (login: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  return response.json();
};
