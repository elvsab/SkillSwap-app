import type { Meta, StoryObj } from "@storybook/react";
import { SkillTag } from "./SkillTag";

const meta = {
  title: "shared/ui/SkillTag",
  component: SkillTag,
  parameters: { layout: "centered" },
} satisfies Meta<typeof SkillTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Игра на барабанах",
    backgroundColor: "#E3F2FD",
  },
};