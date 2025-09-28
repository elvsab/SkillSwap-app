import React from 'react';
import clsx from 'clsx';
import styles from './checkbox.module.scss';
import type { CheckboxVariant, CheckboxProps } from './types';

export const Checkbox: React.FC<CheckboxProps> = ({
    variant,
    defaultVariant = 'unchecked',
    onChange,
    label,
    id,
    ariaLabel,
}) => {
    const [internalVariant, setInternalVariant] = React.useState<CheckboxVariant>(defaultVariant);
    
    const current = variant ?? internalVariant;

    const handleClick = () => {
        let next: CheckboxVariant;
        if (current === "unchecked") next = "mixed";
        else if (current === "mixed") next = "checked";
        else next = "unchecked";
        setInternalVariant(next);
        onChange?.(next);
    };

return (
    <label
      className={clsx(styles.checkbox)}
      data-variant={current}
      htmlFor={id}
    >
      <input
        type="checkbox"
        id={id}
        onChange={handleClick}
        aria-label={ariaLabel}
        className={styles.checkbox__input}
        checked={current === 'checked'}
        aria-checked={current === 'mixed' ? 'mixed' : current === 'checked'}
      />
      <span className={styles.checkbox__box} aria-hidden="true"/>
      {label && <span className={styles.checkbox__label}>{label}</span>}
    </label>
)
};