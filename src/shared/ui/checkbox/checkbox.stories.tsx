import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';
import { Checkbox } from './checkbox';
import type { CheckboxVariant } from './types';

const meta: Meta<typeof Checkbox> = {
  title: 'shared/ui/checkbox',
  component: Checkbox,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['unchecked', 'checked', 'mixed'],
      description: 'Текущее состояние чекбокса',
      table: { type: { summary: `'unchecked' | 'checked' | 'mixed'` } },
    },
    label: {
      control: 'text',
    },
    ariaLabel: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    onChange: {
      action: 'changed',
      table: { category: 'Events' },
    },
  },
  args: {
    id: 'checkbox-story',
    ariaLabel: 'Checkbox',
    variant: 'unchecked',
    label: '',
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  name: 'Unchecked',
  args: { variant: 'unchecked' },
};

export const Checked: Story = {
  name: 'Checked',
  args: { variant: 'checked' },
};

export const Mixed: Story = {
  name: 'Mixed',
  args: { variant: 'mixed' },
};

export const ControlledToggle: Story = {
  name: 'Переключение состояний',
  render: (args) => {
    const [variant, setVariant] = useState<CheckboxVariant>(args.variant ?? 'unchecked');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next: CheckboxVariant = e.target.indeterminate ? 'mixed' : e.target.checked ? 'checked' : 'unchecked';
      setVariant(next);
      args.onChange?.(e);
    };

    return <Checkbox {...args} variant={variant} onChange={handleChange} />;
  },
  args: { label: 'Кликабельный чекбокс', variant: 'unchecked' },
};
