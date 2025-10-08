import type { Meta, StoryObj } from "@storybook/react";
import { Requests } from "./Requests";

const meta: Meta<typeof Requests> = {
  title: "Profile/Pages/Requests",
  component: Requests,
};

export default meta;
type Story = StoryObj<typeof Requests>;

export const Default: Story = {
  render: () => <Requests />,
};
