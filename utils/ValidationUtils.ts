export const validateEmail = (email: string): string => {
  if (!email) return "Введите корректные данные";
  if (email.length < 6) return "Введите корректные данные";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Введите пароль";
  if (password.length < 6) return "Неправильный пароль";
  return "";
};
