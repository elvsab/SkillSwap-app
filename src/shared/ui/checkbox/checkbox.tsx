import React from 'react';
import clsx from 'clsx';
import { useRef, useEffect } from 'react';
import styles from './checkbox.module.scss';
import type { CheckboxProps } from './types';

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
      <span className={styles.checkbox__box} aria-hidden="true"/>
      {label && <span className={styles.checkbox__label}>{label}</span>}
    </label>
)
};