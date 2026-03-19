import clsx from "clsx";
import { type InputProps } from "./Input.types";
import styles from "./Input.module.scss";
import { forwardRef, useState } from "react";
import EyeIcon from "../../assets/icons/inputs/eye.svg";
import EyeSlashIcon from "../../assets/icons/inputs/eye-slash.svg";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, message, type, placeholder, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    const isPasswordInput = type === "password";
    const inputType = isPasswordInput && visible ? "text" : type;
    const toggleVisibility = () => {
      setVisible((prev) => !prev);
    };

    return (
      <div className={styles.input__container}>
        {label && <label className={styles.input__label}>{label}</label>}
        <div className={clsx(styles.input__wrapper, className)}>
          <input
            ref={ref}
            className={clsx(styles.input, { [styles.input__error]: error })}
            type={inputType}
            placeholder={isFocused ? "" : placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {isPasswordInput && (
            <button
              type="button"
              className={styles.input__icon_toggle_visibility}
              onClick={toggleVisibility}
              aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
            >
              {visible ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
        {message ? (
          <span
            className={clsx(styles.input__message, {
              [styles.input__message_error]: error,
            })}
          >
            {message}
          </span>
        ) : null}
      </div>
    );
  }
);

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} {...props} type="text" />
);

export const InputEmail = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} {...props} type="email" />
);

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} {...props} type="password" />
);
