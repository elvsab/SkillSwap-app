import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "shared/ui/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    onChange: () => console.log("Input value has been changed"),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputPassword: Story = {
  args: {
    label: "Пароль",
    type: "password",
    name: "password",
    placeholder: "Введите пароль",
  },
};

export const InputPasswordFilled: Story = {
  args: {
    label: "Пароль",
    type: "password",
    name: "password",
    placeholder: "Введите пароль",
    value: "123test",
  },
};

export const InputPasswordError: Story = {
  args: {
    label: "Пароль",
    type: "password",
    name: "password",
    placeholder: "Введите пароль",
    value: "123test",
    error: true,
    message: "Пароль должен содержать не менее 8 знаков",
  },
};

export const InputEmail: Story = {
  args: {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Введите email",
  },
};

export const InputEmailFilled: Story = {
  args: {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Введите email",
    value: "test_email@test.ru",
  },
};

export const InputEmailError: Story = {
  args: {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Введите email",
    value: "test_email@test.ru",
    error: true,
    message: "Email уже используется",
  },
};
