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

function validateInn(inn: string): ValidationError | null {
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

export default validateInn;
