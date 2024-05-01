import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleBurgerMenu, closeBurgerMenu } from "@/redux/slices/burgerMenuSlice";
import styles from "./BurgerMenu.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logoFooter.png";
import Button from "@/components/Button/Button";
import { BurgerMenuProps } from "@/types/types";

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isAuthenticated, logout, handleLogin }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.burgerMenu.isOpen);

  const toggleMenu = () => {
    dispatch(toggleBurgerMenu());
  };

  const handleLink = () => {
    dispatch(closeBurgerMenu());
  };

  const handleLogout = () => {
    logout();
    dispatch(closeBurgerMenu());
  };

  const handleLoginAndCloseMenu = () => {
    handleLogin();
    dispatch(closeBurgerMenu());
  };

  return (
    <div className={styles.burgerMenuContainer}>
      <button className={`${styles.burgerMenuButton} ${isOpen ? styles.open : ""}`} onClick={toggleMenu} aria-label="Toggle Menu">
        <span className={styles.burgerMenuIcon} />
      </button>
      <div className={`${styles.burgerMenuContent} ${isOpen ? styles.open : ""}`}>
        <Image className={styles.logo} src={Logo} alt="Логотип" width={141} height={141} />
        <nav className={styles.burgerMenuNav}>
          <ul className={styles.burgerMenuList}>
            <li className={styles.burgerMenuItem}>
              <Link href="/" passHref>
                <span className={styles.burgerMenuItemLink} onClick={handleLink}>
                  Главная
                </span>
              </Link>
            </li>
            <li className={styles.burgerMenuItem}>
              <Link href="/rates" passHref>
                <span className={styles.burgerMenuItemLink} onClick={handleLink}>
                  Тарифы
                </span>
              </Link>
            </li>
            <li className={styles.burgerMenuItem}>
              <Link href="/FAQ" passHref>
                <span className={styles.burgerMenuItemLink} onClick={handleLink}>
                  FAQ
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        {isAuthenticated ? (
          <div className={styles.logoutContainer}>
            <Button buttonText="Выйти" className={styles.logout} onClick={handleLogout} />
          </div>
        ) : (
          <div className={styles.authContainer}>
            <span className={styles.registerLink}>Зарегистрироваться</span>
            <Button buttonText="Войти" className={styles.login} onClick={handleLoginAndCloseMenu} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
