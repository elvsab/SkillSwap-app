import type { Meta, StoryObj } from "@storybook/react";
import { Exchanges } from "./Exchanges";

const meta: Meta<typeof Exchanges> = {
  title: "Profile/Pages/Exchanges",
  component: Exchanges,
};

export default meta;
type Story = StoryObj<typeof Exchanges>;

export const Default: Story = {
  render: () => <Exchanges />,
};
