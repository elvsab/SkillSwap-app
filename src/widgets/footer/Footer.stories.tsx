import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Widgets/Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
