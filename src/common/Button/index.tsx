import React, { ReactNode } from "react";
import styles from "./Button.module.css";
import cx from "classnames";

interface ButtonProps {
  onClick?: (...args: any[]) => any;
  value?: string;
  color: "primary" | "secondary" | "warning" | "danger";
  type?: "button" | "submit" | "reset" | undefined;
  icon?: ReactNode | undefined;
  style?: any;
}
export default function SendButton({
  onClick,
  value,
  color,
  type,
  icon,
  ...rest
}: ButtonProps): JSX.Element {
  return icon ? (
    <button
      className={cx({ [styles.ripple]: true }, { [styles.iconButton]: true })}
      onClick={onClick}
    >
      {icon}
    </button>
  ) : (
    <button
      {...rest}
      onClick={onClick}
      type={type ? type : "button"}
      color="primary"
      className={cx(
        { [styles.button]: true },
        { [styles.ripple]: true },
        { [styles[color]]: true }
      )}
    >
      {value}
    </button>
  );
}
