interface ValidationError {
  code: number;
  message: string;
}

function checkDigit(inn: string, coefficients: number[]): number {
  let n = 0;
  for (let i = 0; i < coefficients.length; i++) {
    n += coefficients[i] * parseInt(inn[i], 10);
  }
  return parseInt(((n % 11) % 10) + "", 10);
}

export function validateInn(inn: string): ValidationError | null {
  if (!inn.length) {
    return { code: 1, message: "ИНН пуст" };
  } else if (/[^0-9]/.test(inn)) {
    return { code: 2, message: "ИНН может состоять только из цифр" };
  } else if (inn.length !== 10 && inn.length !== 12) {
    return { code: 3, message: "ИНН должен быть длиной 10 или 12 цифр" };
  } else {
    let coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    if (inn.length === 10) {
      const n10 = checkDigit(inn, coefficients);
      if (n10 !== parseInt(inn[9], 10)) {
        return { code: 4, message: "Неправильное контрольное число" };
      }
    } else {
      coefficients.unshift(7);
      const n11 = checkDigit(inn.substr(0, 10), coefficients);
      const n12 = checkDigit(inn.substr(0, 11), coefficients);
      if (n11 !== parseInt(inn[10], 10) || n12 !== parseInt(inn[11], 10)) {
        return { code: 4, message: "Неправильное контрольное число" };
      }
    }
  }
  return null;
}

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
  if (!startDate || !endDate) {
    return " ";
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Установка текущей даты без учета времени

  const startDateObj = new Date(startDate);
  startDateObj.setHours(0, 0, 0, 0); // Установка даты начала без учета времени

  const endDateObj = new Date(endDate);
  endDateObj.setHours(0, 0, 0, 0); // Установка даты окончания без учета времени

  if (startDateObj > currentDate || endDateObj > currentDate) {
    return "Даты не должны быть в будущем времени";
  }

  if (startDateObj > endDateObj) {
    return "Дата начала не может быть позже даты окончания";
  }

  return "";
};
