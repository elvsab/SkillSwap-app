import clsx from "clsx";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  type,
  textColor,
  padding,
  buttonWidth,
  label,
  onClick,
  loading,
  icon,
  secondClass,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(styles.button, secondClass && styles[secondClass])}
      style={{
        color: textColor,
        padding,
        width: buttonWidth,
      }}
      onClick={onClick}
    >
      {loading ? "Загрузка..." : label}
      {icon && !loading && (
        <img src={icon} alt="" className={clsx(styles.icon)} />
      )}
    </button>
  );
};
