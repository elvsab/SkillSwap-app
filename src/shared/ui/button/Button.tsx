import clsx from "clsx";
import styles from "./button.module.css";
export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  /** Цвет текста */
  textColor?: string;
  /** Цвет фона */
  backgroundColor?: string;
  /** Содержимое кнопки */
  label: string;
  /** Стиль бордера */
  borderColor?: string;
  /** Толщина бордера */
  borderWidth?: string;
  /** Паддинги */
  padding?: string;
  /** Ширина 100% или min-content */
  buttonWidth?: string;
  /** Обработчик клика */
  onClick?: () => void;
  /** Для состояния загрузки, если надо будет */
  loading?: boolean;
  /** Если нужно добавить иконку справа */
  icon?: string;
}

export const Button = ({
  type,
  textColor,
  backgroundColor,
  borderColor,
  borderWidth,
  padding,
  buttonWidth,
  label,
  onClick,
  loading,
  icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.button)}
      style={{
        backgroundColor,
        color: textColor,
        border: borderColor
          ? `${borderWidth || "1px"} solid ${borderColor}`
          : "none",
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
