import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Img from "@/public/LoginImg.svg";
import Login from "@/components/Login/Login";
import Lock from "@/public/Lock.svg";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerImg}>
        <h2 className={styles.title}>Для оформления подписки на тариф, необходимо авторизоваться.</h2>
        <Image className={styles.img} src={Img} alt="Для оформления подписки на тариф, необходимо авторизоваться" width={321} height={342} />
      </div>
      <Image className={styles.lock} src={Lock} alt="Замок" width={75} height={92} />
      <Login />
    </div>
  );
};

export default LoginPage;
