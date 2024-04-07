import React from "react";
import { ButtonProps } from "@/types/types";

const Button: React.FC<ButtonProps> = ({ buttonText, className, style }) => {
  return (
    <button style={style} className={className}>
      {buttonText}
    </button>
  );
};

export default Button;
