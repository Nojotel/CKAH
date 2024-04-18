"use client";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import Avatar from "@/public/Avatar.png";
import Logout from "@/public/Logout.png";
import { validateEmail, validatePassword } from "@/utils/ValidationUtils";
import { useAuth } from "@/redux/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login, logout, user, accountInfo, isLoading, accessToken, getUserInfo } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);
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
    if (email === "" && password === "") {
      setIsFormValid(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (document.activeElement instanceof HTMLInputElement) {
      setIsAutofilled(document.activeElement.autocomplete === "on");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        await login(email, password);
        router.push("/");
      } catch (error) {
        console.error("Failed to log in", error);
        alert("Неправильный логин или пароль");
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
        <div className={styles.userInfo}>
          <div className={styles.accountInfo}>
            {isLoading ? (
              <div>Loading...</div>
            ) : accountInfo ? (
              <div>
                <div>Лимит по компаниям: {accountInfo.companyLimit}</div>
                <div>Использовано компаний: {accountInfo.usedCompanies}</div>
              </div>
            ) : null}
          </div>
          <div className={styles.userAvatar}>
            <Image src={Avatar} alt="Avatar" width={48} height={48} />
            <div>{user.name}</div>
            <button onClick={logout}>
              <Image src={Logout} alt="Logout" width={24} height={24} />
            </button>
          </div>
        </div>
      ) : (
        <>
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
            <input type="submit" value="Войти" className={`${styles.submit} ${isFormValid || isAutofilled ? "" : styles.submitDisabled}`} disabled={!isFormValid && !isAutofilled} />
          </form>
          <div className={styles.restorePassword}>Восстановить пароль</div>
        </>
      )}
    </div>
  );
};

export default Login;
