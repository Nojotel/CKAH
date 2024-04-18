import React from "react";
import styles from "./Registration.module.css";
import Button from "@/components/Button/Button";

interface RegistrationProps {
  onClick: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.text} onClick={onClick}>
        Зарегистрироваться
      </div>
      <div className={styles.line}></div>
      <Button buttonText="Войти" className={styles.buttonHeader} onClick={onClick} />
    </div>
  );
};

export default Registration;
