import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import LogoFooter from "@/public/logoFooter.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Image className={styles.logo} src={LogoFooter} alt="Логотип" width={141} height={141} />
        <div className={styles.containerText}>
          г. Москва, Цветной б-р, 40 <br />
          +7 495 771 21 11 <br />
          info@skan.ru <br />
          <br />
          Copyright. 2022
        </div>
      </div>
    </footer>
  );
};

export default Footer;
