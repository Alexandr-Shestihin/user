import React, { FunctionComponent } from "react";
import classNames from "classnames";
import { Styled } from "./style";

interface IProps {
  type?: "button" | "submit";
  label?: string | JSX.Element;
  variant?: "primary" | "secondary";
  size?: "sm";
  disabled?: boolean;
  action: Function;
  fullWidth?: boolean;
}

const Button: FunctionComponent<IProps> = ({
  type = "button",
  label = "Button",
  variant = "primary",
  disabled = false,
  size,
  action,
  fullWidth = false,
}) => {
  return (
    <Styled.Button
      onClick={(e: React.SyntheticEvent<HTMLElement>) => {
        if (action) return action(e);
      }}
      className={classNames(variant, size, fullWidth ? "full-width" : "")}
      disabled={disabled}
      type={type}
    >
      {label}
    </Styled.Button>
  );
};

export default Button;
