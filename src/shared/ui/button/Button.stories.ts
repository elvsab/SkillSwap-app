import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import crossIcon from "../../assets/icons/ui/cross.svg";
import { Button } from "./Button";

const meta = {
  title: "shared/ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    borderColor: { control: "color" },
    borderWidth: { control: "text" },
    padding: { control: "text" },
    buttonWidth: { control: "text" },
    icon: { control: "text" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Примеры
export const Default: Story = {
  args: {
    label: "О проекте",
  },
};

export const Green: Story = {
  args: {
    label: "Подробнее",
    backgroundColor: "var(--font-color-accent)",
    textColor: "var(--font-color-primary)",
    padding: "12px 24px",
  },
};

export const WithBorder: Story = {
  args: {
    label: "Войти",
    backgroundColor: "#fff",
    borderColor: "var(--font-color-accent)",
    padding: "12px 24px",
  },
};

export const WithoutBorder: Story = {
  args: {
    label: "Зарегистрироваться",
    textColor: "var(--font-color-link)",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Закрыть",
    icon: crossIcon, // путь к картинке
    padding: "12px 24px",
  },
};
