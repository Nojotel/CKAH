"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import styles from "./Header.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthProvider";
import Registration from "@/components/Registration/Registration";
import UserHeader from "@/components/UserHeader/UserHeader";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, accountInfo, logout, accessToken, getUserInfo } = useAuth();

  useEffect(() => {
    if (accessToken) {
      getUserInfo(accessToken);
    }
  }, [accessToken, getUserInfo]);

  const isActive = (path: string) => pathname === path;

  const handleLogin = () => {
    router.push("/login");
  };

  const storedToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const tokenExpire = typeof window !== "undefined" ? localStorage.getItem("tokenExpire") : null;

  const headerComponent = isAuthenticated && accountInfo !== null ? <UserHeader user={user} accountInfo={accountInfo} logout={logout} /> : <Registration onClick={handleLogin} />;

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image className={styles.logo} src={Logo} alt="Логотип" width={110} height={70} priority />
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
      {headerComponent}
    </header>
  );
};

export default Header;
