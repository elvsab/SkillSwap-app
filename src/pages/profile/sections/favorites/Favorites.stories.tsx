import type { Meta, StoryObj } from "@storybook/react";
import { Favorites } from "./Favorites";

const meta: Meta<typeof Favorites> = {
  title: "Profile/Pages/Favorites",
  component: Favorites,
};

export default meta;
type Story = StoryObj<typeof Favorites>;

export const Default: Story = {
  render: () => <Favorites />,
};
