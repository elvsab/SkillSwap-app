import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { ProfileNav } from "./ProfileNav";

const meta: Meta<typeof ProfileNav> = {
  title: "Profile/Pages/ProfileNav",
  component: ProfileNav,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: "324px", padding: "20px", background: "#f9f9f9" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileNav>;

export const Default: Story = {};
