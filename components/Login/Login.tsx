"use client";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import { validateEmail, validatePassword } from "@/utils/ValidationUtils";
import { useAuth } from "@/hooks/AuthProvider";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login, user, accessToken, getUserInfo } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

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
    const isInputAutofilled = document.querySelector("input:-webkit-autofill");
    setIsAutofilled(!!isInputAutofilled);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        await login(email, password);
        if (accessToken) {
          router.push("/");
        } else {
          setLoginError("Неправильный логин или пароль");
        }
      } catch (error: any) {
        console.error("Неправильный логин или пароль", error);
        setLoginError(error.message || "Неправильный логин или пароль");
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUserInfo(accessToken);
    }
  }, [accessToken, getUserInfo]);

  return (
    <div className={styles.container}>
      {user ? (
        <div>{user.name}</div>
      ) : (
        <>
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
            <div className={styles.errorText}>{loginError}</div>
            <input type="submit" value="Войти" className={`${styles.submit} ${isFormValid || isAutofilled ? "" : styles.submitDisabled}`} disabled={!isFormValid && !isAutofilled} />
          </form>
          <div className={styles.restorePassword}>Восстановить пароль</div>
        </>
      )}
    </div>
  );
};

export default Login;
