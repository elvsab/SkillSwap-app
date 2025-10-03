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
    textColor: { control: "color" },
    padding: { control: "text" },
    buttonWidth: { control: "text" },
    icon: { control: "text" },
    secondClass: { control: "text" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Примеры
export const TertiaryDefault: Story = {
  args: {
    label: "О проекте",
  },
};

export const Primary: Story = {
  args: {
    label: "Подробнее",
    secondClass: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Войти",
    secondClass: "secondary",
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
