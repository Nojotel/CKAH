import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "@/types/types";

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return <button className={styles.button}>{buttonText}</button>;
};

export default Button;
