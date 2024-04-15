"use client";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import styles from "./Login.module.css";
import Image from "next/image";
import Google from "@/public/Google.svg";
import Facebook from "@/public/Facebook.svg";
import Yandex from "@/public/Yandex.svg";
import { validateEmail, validatePassword } from "@/utils/ValidationUtils";
import { AuthContext } from "@/api/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter(); // Получаем экземпляр роутера
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  }, []);

  const checkFormValidity = useCallback(() => {
    setIsFormValid(emailError === "" && passwordError === "" && email !== "" && password !== "");
  }, [email, password, emailError, passwordError]);

  useEffect(() => {
    checkFormValidity();
  }, [checkFormValidity, email, password]);

  useEffect(() => {
    if (email && password) {
      setIsFormValid(true);
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        await login(email, password);
        router.push("/search"); // Переходим на страницу /search после успешной авторизации
      } catch (error) {
        console.error("Ошибка авторизации:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerLink}>
        <div className={`${styles.textLink} ${styles.underline}`}>Войти</div>
        <div className={`${styles.textLinkOff} ${styles.underlineOff}`}>Зарегистрироваться</div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.labelText}>
          Логин:
          <input type="text" className={`${styles.usernameText} ${emailError ? styles.inputError : ""}`} name="username" value={email} onChange={handleEmailChange} autoComplete="email" />
          <div className={styles.errorText}>{emailError}</div>
        </label>
        <label className={styles.labelText}>
          Пароль:
          <input type="password" className={`${styles.passwordText} ${passwordError ? styles.inputError : ""}`} name="password" value={password} onChange={handlePasswordChange} autoComplete="current-password" />
          <div className={styles.errorText}>{passwordError}</div>
        </label>
        <input type="submit" value="Войти" className={`${styles.submit} ${isFormValid ? "" : styles.submitDisabled}`} disabled={!isFormValid} />
      </form>
      <div className={styles.restorePassword}>Восстановить пароль</div>
      <div className={styles.textIn}> Войти через:</div>
      <div className={styles.containerSocial}>
        <button className={styles.containerGoogle}>
          <Image className={styles.socialImg} src={Google} alt="Google" width={56} height={17} />
        </button>
        <button className={styles.containerFacebook}>
          <Image className={styles.socialImg} src={Facebook} alt="Facebook" width={56} height={17} />
        </button>
        <button className={styles.containerYandex}>
          <Image className={styles.socialImg} src={Yandex} alt="Yandex" width={56} height={17} />
        </button>
      </div>
    </div>
  );
};

export default Login;
