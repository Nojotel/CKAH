"use client";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import Google from "@/public/Google.svg";
import Facebook from "@/public/Facebook.svg";
import Yandex from "@/public/Yandex.svg";
import { validateEmail, validatePassword } from "@/utils/ValidationUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);

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
    // Check if fields are autofilled
    if (document.activeElement instanceof HTMLInputElement) {
      setIsAutofilled(document.activeElement.autocomplete === "on");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", { email, password });
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
        <input type="submit" value="Войти" className={`${styles.submit} ${isFormValid || isAutofilled ? "" : styles.submitDisabled}`} disabled={!isFormValid && !isAutofilled} />
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
