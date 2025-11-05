import React from 'react';
import clsx from 'clsx';
import { useRef, useEffect } from 'react';
import styles from './checkbox.module.scss';
import type { CheckboxProps } from './types';

import DoneIcon from "../../assets/icons/ui/checkbox-done.svg";
import RemoveIcon from "../../assets/icons/ui/checkbox-remove.svg";
import EmptyIcon from "../../assets/icons/ui/checkbox-empty.svg";

export const Checkbox: React.FC<CheckboxProps> = ({
    variant,
    onChange,
    label,
    id,
    ariaLabel,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = variant === 'mixed';
        }
    }, [variant]);

    const Icon =
    variant === "checked"
      ? DoneIcon
      : variant === "mixed"
      ? RemoveIcon
      : EmptyIcon;

return (
    <label
      className={clsx(styles.checkbox)}
      data-variant={variant}
      htmlFor={id}
    >
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        onChange={onChange}
        aria-label={ariaLabel}
        className={styles.checkbox__input}
        checked={variant === 'checked'}
        aria-checked={variant === 'mixed' ? 'mixed' : variant === 'checked'}
      />
      <span className={clsx(styles.checkbox__box, {
          [styles.checked]: variant === "checked",
          [styles.mixed]: variant === "mixed",
        })}
        aria-hidden="true">
      <Icon className={styles.icon} aria-hidden="true" focusable="false" />
      </span>
      {label && <span className={styles.checkbox__label}>{label}</span>}
    </label>
)
};