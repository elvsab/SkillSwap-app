import clsx from 'clsx';
import {type InputProps} from './types'
import styles from './input.module.css'
import { forwardRef, useState } from 'react';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    className, 
    label, 
    error, 
    message, 
    type, 
    placeholder, 
    ...props}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        <div className={styles.input__container}>
            {label && <label className={styles.input__label}>{label}</label>}
            <div className={clsx(styles.input__wrapper, className)}>
                <input
                ref={ref}
                className={clsx(styles.input, {[styles.input__error]: error})}
                type={type}
                placeholder={isFocused ? '' : placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
                />
            </div>
            {message ? <span className={clsx(styles.input__message, {[styles.input__message_error]: error})}>{message}</span> : null}
        </div>
    )
});

export const InputText = (props: InputProps) => Input({ ...props, type: 'text' }); 

export const InputEmail = (props: InputProps) => Input({ ...props, name: 'email', type: 'email' });
