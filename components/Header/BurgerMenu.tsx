import React, { useState } from "react";
import styles from "./BurgerMenu.module.css";
import Link from "next/link";

interface BurgerMenuProps {
  isAuthenticated: boolean;
  headerComponent: React.ReactNode;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isAuthenticated, headerComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLink = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.burgerMenuContainer}>
      <button className={styles.burgerMenuButton} onClick={toggleMenu}>
        <span className={styles.burgerMenuIcon} />
      </button>
      {isOpen && (
        <div className={styles.burgerMenuContent}>
          <nav className={styles.burgerMenuNav}>
            <ul className={styles.burgerMenuList}>
              <li className={styles.burgerMenuItem}>
                <Link href="/" onClick={handleLink}>
                  Главная
                </Link>
              </li>
              <li className={styles.burgerMenuItem}>
                <Link href="/rates" onClick={handleLink}>
                  Тарифы
                </Link>
              </li>
              <li className={styles.burgerMenuItem}>
                <Link href="/FAQ" onClick={handleLink}>
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
          {headerComponent}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
