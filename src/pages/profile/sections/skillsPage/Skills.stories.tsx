import type { Meta, StoryObj } from "@storybook/react";
import { Skills } from "./Skills";

const meta: Meta<typeof Skills> = {
  title: "Profile/Pages/Skills",
  component: Skills,
};

export default meta;
type Story = StoryObj<typeof Skills>;

export const Default: Story = {
  render: () => <Skills />,
};
