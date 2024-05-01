"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import styles from "./Header.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthProvider";
import Registration from "@/components/Registration/Registration";
import UserHeader from "@/components/UserHeader/UserHeader";
import BurgerMenu from "./BurgerMenu";
import loaderStyles from "@/components/Loader/LoaderHeader.module.css";
import MDSpinner from "react-md-spinner";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, accountInfo, logout, accessToken, getUserInfo, isLoading, isAuthCheckingInProgress } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingAccountInfo, setIsLoadingAccountInfo] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1550);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (accessToken) getUserInfo(accessToken);
  }, [accessToken, getUserInfo]);

  useEffect(() => {
    setIsLoadingAccountInfo(true);
    const timeout = setTimeout(() => setIsLoadingAccountInfo(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const isActive = (path: string) => pathname === path;
  const handleLogin = () => router.push("/login");

  if (isAuthCheckingInProgress) return null;

  const headerComponent = isAuthenticated && accountInfo !== null ? <UserHeader user={user} accountInfo={accountInfo} logout={logout} isLoading={isLoading} /> : <Registration onClick={handleLogin} />;

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image className={styles.logo} src={Logo} alt="Логотип" width={110} height={70} priority />
      </Link>
      {isMobile ? (
        <>
          {accountInfo && (
            <div className={styles.accountInfo}>
              {isLoadingAccountInfo ? (
                <div className={loaderStyles.loaderContainer}>
                  <MDSpinner />
                </div>
              ) : (
                <div className={styles.containerCompani}>
                  <div className={styles.containerCompaniUseText}>
                    Использовано компаний <span className={styles.usedCompanyCount}>{accountInfo.usedCompanyCount}</span>
                  </div>
                  <div className={styles.containerCompaniLimitText}>
                    Лимит по компаниям <span className={styles.companyLimit}>{accountInfo.companyLimit}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          <BurgerMenu isAuthenticated={isAuthenticated} logout={logout} handleLogin={handleLogin} />
        </>
      ) : (
        <>
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
        </>
      )}
    </header>
  );
};

export default Header;
