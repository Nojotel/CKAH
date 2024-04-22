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

export const validateDocumentCount = (documentCount: string): string => {
  const numValue = parseInt(documentCount);
  if (isNaN(numValue) || numValue < 1 || numValue > 1000 || documentCount.length > 4) {
    return "Значение должно быть от 1 до 1000";
  }
  return "";
};

export const validateDateRange = (startDate: string, endDate: string): string => {
  const currentDate = new Date();
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  if (isNaN(startDateObj.getTime())) {
    return "Введите дату";
  }

  if (isNaN(endDateObj.getTime())) {
    return "Дата окончания не является валидной датой";
  }

  if (startDateObj > currentDate) {
    return "Дата начала не может быть в будущем";
  }

  if (endDateObj > currentDate) {
    return "Дата окончания не может быть в будущем";
  }

  if (startDateObj > endDateObj) {
    return "Дата начала не может быть позже даты окончания";
  }

  return "";
};
