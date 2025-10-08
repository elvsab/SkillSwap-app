import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RegisterFormUI } from './RegisterForm';

const meta: Meta<typeof RegisterFormUI> = {
  title: 'UI/RegisterFormUI',
  component: RegisterFormUI,
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

type Story = StoryObj<typeof RegisterFormUI>;

// Компонент-обертка с состоянием для Storybook
const WithState = (props: React.ComponentProps<typeof RegisterFormUI>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <RegisterFormUI
      {...props}
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={() => console.log('Register form submitted', { email, password })}
    />
  );
};

// Базовые аргументы для формы регистрации
const baseRegisterArgs = {
  emailLabel: 'Email',
  passwordLabel: 'Пароль',
  emailPlaceholder: 'Введите email',
  passwordPlaceholder: 'Придумайте надёжный пароль',
 submitButtonText: 'Далее',
  passwordHelp: 'Пароль должен содержать не менее 8 знаков',
  passwordAuto: 'new-password' as const,
};

export const Playground: Story = {
  args: { ...baseRegisterArgs },
  render: (args) => <WithState {...args} />
};

export const Default: Story = {
  args: { ...baseRegisterArgs },
  render: (args) => <WithState {...args} />
};

export const WithError: Story = {
  args: {
    ...baseRegisterArgs,
    emailErrorMessage: 'Email уже используется'
  },
  render: (args) => <WithState {...args} />
};

export const Loading: Story = {
  args: {
    ...baseRegisterArgs,
    loading: true
  },
  render: (args) => <WithState {...args} />
};

export const Disabled: Story = {
  args: {
    ...baseRegisterArgs,
    disabled: true
  },
  render: (args) => <WithState {...args} />
};
