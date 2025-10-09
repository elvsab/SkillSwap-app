import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "features/auth/ui/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "Интерактивная демонстрация - можно вводить данные и видеть валидацию в реальном времени",
      },
    },
  },
  args: {
    onSubmit: (data) => console.log("Отправка формы:", data),
    onSwitchToRegister: () => console.log("Переход к форме регистрации"),
  },
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
