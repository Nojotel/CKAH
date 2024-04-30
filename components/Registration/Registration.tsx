import React from "react";
import { useDispatch } from "react-redux";
import { closeBurgerMenu } from "@/redux/slices/burgerMenuSlice";
import styles from "./Registration.module.css";
import Button from "@/components/Button/Button";

interface RegistrationProps {
  onClick: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onClick }) => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    onClick();
    dispatch(closeBurgerMenu());
  };

  return (
    <div className={styles.container}>
      <div className={styles.text} onClick={onClick}>
        Зарегистрироваться
      </div>
      <div className={styles.line}></div>
      <Button buttonText="Войти" className={styles.buttonHeader} onClick={handleLogin} />
    </div>
  );
};

export default Registration;
