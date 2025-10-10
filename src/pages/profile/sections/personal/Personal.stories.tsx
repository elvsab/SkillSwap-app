import type { Meta, StoryObj } from "@storybook/react";
import { Personal } from "./Personal";

const meta: Meta<typeof Personal> = {
  title: "Profile/Pages/Personal",
  component: Personal,
};

export default meta;
type Story = StoryObj<typeof Personal>;

export const Default: Story = {
  render: () => <Personal />,
};
