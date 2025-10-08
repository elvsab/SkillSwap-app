import type { ReactNode } from 'react';

export interface AuthFormProps {
  email: string;
  password: string;

  /** Ошибки */
  emailErrorMessage?: string;
  passwordErrorMessage?: string;

  /** Лейбл */
  emailLabel?: string;
  passwordLabel?: string;

  /** Плейсхолдер*/
  emailPlaceholder?: string;
  passwordPlaceholder?: string;

  /** Текст кнопки отправки */
  submitButtonText?: string;
  /** Подсказка для пароля (при регистрации) */
  passwordHelp?: string;
  /** Автозаполнение для пароля */
  passwordAuto?: string;
  /** Состояние disabled */
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;

  className?: string;
  middleContent?: ReactNode;
  isFormValid?: boolean;
  footerContent?: ReactNode;
  
    /** Обработчики*/
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onSubmit?: () => void;
}