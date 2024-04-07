"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import styles from "./Header.module.css";
import Button from "@/components/Button/Button";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <div>
          <Image className={styles.logo} src={Logo} alt="Логотип" width={110} height={70} priority />
        </div>
      </Link>
      <nav className={styles.navigation}>
        <ul className={styles.menu}>
          <li className={`${styles.menuItem} ${isActive("/") ? styles.active : ""}`}>
            <Link href="/">Главная</Link>
          </li>
          <li className={`${styles.menuItem} ${isActive("/rates") ? styles.active : ""}`}>
            <Link href="/rates">Тарифы</Link>
          </li>
          <li className={`${styles.menuItem} ${isActive("/FAQ") ? styles.active : ""}`}>
            <Link href="/FAQ">FAQ</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.container}>
        <div className={styles.text}>Зарегистрироваться</div>
        <div className={styles.line}></div>
        <Button buttonText="Войти" className={styles.buttonHeader} />
      </div>
    </header>
  );
};

export default Header;
