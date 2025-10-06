import type { Meta, StoryObj } from "@storybook/react";
import { IconWrapper } from "./IconWrapper";
import CrossIcon from "../../assets/icons/ui/cross.svg";

const meta: Meta<typeof IconWrapper> = {
  title: "Components/IconWrapper",
  component: IconWrapper,
  argTypes: {
    width: {
      control: { type: "text" },
      description: "Ширина иконки",
    },
    height: {
      control: { type: "text" },
      description: "Высота иконки",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconWrapper>;

export const Size24x24: Story = {
  args: {
    icon: CrossIcon,
    width: "24px",
    height: "24px",
  },
};

export const Size48x48: Story = {
  args: {
    icon: CrossIcon,
    width: "48px",
    height: "48px",
  },
};
