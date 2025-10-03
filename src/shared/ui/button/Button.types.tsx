export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  /** Цвет текста */
  textColor?: string;
  /** Содержимое кнопки */
  label: string;
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
  /** Добавить класс из стилей */
  secondClass?: string;
  disabled?: boolean;
}
