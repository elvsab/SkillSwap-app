import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginFormUI } from './LoginForm';
import styles from './AuthForm.module.css';

const meta: Meta<typeof LoginFormUI> = {
  title: 'UI/LoginFormUI',
  component: LoginFormUI,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' }
  },
  args: {
    disabled: false,
    loading: false
  },
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof LoginFormUI>;


// Компонент переключения на регистрацию (нижний контент)
const FooterSwitchToRegister = () => (
  <div className={styles['auth-switch']}>
    <button type="button" className={styles['auth-switch-btn']}>
      Зарегистрироваться
    </button>
  </div>
);

// Компонент-обертка с состоянием для Storybook
const WithState = (props: React.ComponentProps<typeof LoginFormUI>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginFormUI
      {...props}
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={() => console.log('Login form submitted', { email, password })}
    />
  );
};

// Базовые аргументы для формы входа
const baseLoginArgs = {
  emailLabel: 'Email',
  passwordLabel: 'Пароль',
  emailPlaceholder: 'Введите email',
  passwordPlaceholder: 'Введите ваш пароль',
  submitButtonText: 'Войти',
  passwordAuto: 'current-password' as const,
  footerContent: <FooterSwitchToRegister />
};

// Stories для LoginFormUI
export const Playground: Story = {
  args: { ...baseLoginArgs },
  render: (args) => <WithState {...args} />
};

export const Default: Story = {
  args: { ...baseLoginArgs },
  render: (args) => <WithState {...args} />
};

export const WithError: Story = {
  args: {
    ...baseLoginArgs,
    emailErrorMessage: 'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
  },
  render: (args) => <WithState {...args} />
};

export const Loading: Story = {
  args: {
    ...baseLoginArgs,
    loading: true
  },
  render: (args) => <WithState {...args} />
};

export const Disabled: Story = {
  args: {
    ...baseLoginArgs,
    disabled: true
  },
  render: (args) => <WithState {...args} />
};