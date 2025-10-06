import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

const meta = {
  title: "Widgets/Header",
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "20px" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Варианты Header ---

export const Guest: Story = {
  args: {
    variant: "guest",
    name: "Имя",
  },
};

export const User: Story = {
  args: {
    variant: "user",
    name: "Имя",
  },
};

export const Auth: Story = {
  args: {
    variant: "auth",
    name: "Имя",
  },
};
