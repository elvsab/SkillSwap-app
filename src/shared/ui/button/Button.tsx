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
  className,
  iconPosition = 'right', // Пропс для позиционирования иконки
}: ButtonProps) => {
  const renderIcon = () => {
    if (!icon) return null;
    
    if (typeof icon === "string") {
      return <img src={icon} alt="" className={styles.icon} />;
    } else {
      const Icon = icon;
      return <Icon className={styles.icon} />;
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(styles.button, secondClass && styles[secondClass], className)}
      style={{
        color: textColor,
        padding,
        width: buttonWidth,
      }}
      onClick={onClick}
    >
      {iconPosition === 'left' && !loading && renderIcon()}
      {loading ? "Загрузка..." : label}
      {iconPosition === 'right' && !loading && renderIcon()}
    </button>
  );
};