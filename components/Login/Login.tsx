import React from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import Google from "@/public/Google.svg";
import Facebook from "@/public/Facebook.svg";
import Yandex from "@/public/Yandex.svg";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLink}>
        <div className={`${styles.textLink} ${styles.underline}`}>Войти</div>
        <div className={`${styles.textLinkOff} ${styles.underlineOff}`}>Зарегистрироваться</div>
      </div>
      <form className={styles.form}>
        <label className={styles.labelText}>
          Логин:
          <input type="text" className={styles.usernameText} name="username" />
        </label>
        <label className={styles.labelText}>
          Пароль:
          <input type="password" className={styles.passwordText} name="password" />
        </label>
        <input type="submit" value="Войти" className={styles.submit} />
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
