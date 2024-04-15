import React from "react";
import { ButtonProps } from "@/types/types";

const Button: React.FC<ButtonProps> = ({ buttonText, className, style, onClick }) => {
  return (
    <button style={style} className={className} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
