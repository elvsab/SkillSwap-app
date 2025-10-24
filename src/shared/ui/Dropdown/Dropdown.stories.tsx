import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";
import type { Option } from "./types";

const options: Option[] = [
  { value: "spb", label: "Санкт-Петербург" },
  { value: "mos", label: "Москва" },
  { value: "sam", label: "Самара" },
  { value: "srt", label: "Саратов" },
  { value: "ekb", label: "Екатеринбург" },
];

const noop = () => {};

const meta: Meta<typeof Dropdown> = {
  title: "Shared/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: noop,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <div style={{ width: 436, margin: "0 auto" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    label: "Город",
    placeholder: "Выберите город",
    options,
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    value: "spb",
  },
};

export const Multi: Story = {
  args: {
    ...Default.args,
    label: "Города (несколько)",
    multi: true,
    value: ["spb", "mos"],
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    label: "Город (fullWidth)",
    fullWidth: true,
  },
};

export const SearchableInput: Story = {
  args: {
    label: 'Город',
    placeholder: 'Введите город',
    searchable: true,
    options,
  },
};
