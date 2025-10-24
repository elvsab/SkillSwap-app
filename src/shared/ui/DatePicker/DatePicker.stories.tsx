import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./DatePicker";
import "./DatePicker.module.scss";

const meta: Meta<typeof DatePicker> = {
  title: "Components/Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => <DatePicker />,
};

export const WithDefaultValue: Story = {
  render: () => <DatePicker defaultValue={new Date(1995, 9, 28)} />,
};

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [d, setD] = useState<Date | null>(new Date(2000, 3, 27));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DatePicker value={d} onChange={(v) => setD(v)} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const min = new Date(1990, 0, 1);
    const max = new Date(2025, 11, 31);
    return <DatePicker min={min} max={max} />;
  },
};
