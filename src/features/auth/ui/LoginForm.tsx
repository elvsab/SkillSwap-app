import React from 'react';
import cn from 'clsx';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/button';
import styles from './AuthForm.module.css';
import type { AuthFormProps } from './types';
import { SocialAuth } from './SocialAuth'; 

export const LoginFormUI = ({
  email,
  password,
  emailErrorMessage,
  passwordErrorMessage,
  emailLabel = 'Email',
  passwordLabel = 'Пароль',
  emailPlaceholder = 'Введите email',
  passwordPlaceholder = 'Введите ваш пароль',
  submitButtonText = 'Войти',
  passwordHelp,
  passwordAuto = 'current-password',
  disabled,
  loading,
  middleContent,
  className,
  isFormValid = true,
  footerContent,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: Omit<AuthFormProps, 'option'>) => {

  const isDisabled = Boolean(disabled || loading);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isDisabled && isFormValid) {
      onSubmit?.();
    }
  };

  return (
    <div className={cn(styles['auth-container'], className)}>
      <div className={styles['auth-card']}>
        <form
          className={styles['form-grid']}
          onSubmit={handleSubmit}
          noValidate
        >
          <SocialAuth />

          <div className={styles['auth-container__field']}>
            <Input
              label={emailLabel}
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => onEmailChange?.(e.target.value)}
              name="email"
              autoComplete="email"
              disabled={isDisabled}
              error={Boolean(emailErrorMessage)}
              message={emailErrorMessage}
            />
          </div>

          {middleContent}

            <div className={styles['auth-container__field']}>
            <Input
                label={passwordLabel}
                type="password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={(e) => onPasswordChange?.(e.target.value)}
                name="password"
                autoComplete={passwordAuto}
                disabled={isDisabled}
                error={Boolean(passwordErrorMessage)}
                message={passwordErrorMessage || passwordHelp}
            />
            </div>

          <div className={styles['auth-container__actions']}>
            <Button
              type="submit"
              label={submitButtonText}
              secondClass="primary"
              disabled={loading || !isFormValid}
              loading={loading}
              className={styles['auth-container__submit-button']}
            />
          </div>
        </form>

        {footerContent}
      </div>
    </div>
  );
};