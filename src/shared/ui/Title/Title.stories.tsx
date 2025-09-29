import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta = {
  title: 'Components/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4'],
      description: 'HTML-тег для заголовка',
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'sm', 'xs'],
      description: 'Размер заголовка',
    },
    children: {
      control: 'text',
      description: 'Содержимое заголовка',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые примеры для каждого размера
export const H1: Story = {
  args: {
    as: 'h1',
    size: 'lg',
    children: 'Заголовок первого уровня (lg)',
  },
};

export const H2: Story = {
  args: {
    as: 'h2',
    size: 'md',
    children: 'Заголовок второго уровня (md)',
  },
};

export const H3: Story = {
  args: {
    as: 'h3',
    size: 'sm',
    children: 'Заголовок третьего уровня (sm)',
  },
};

export const H4: Story = {
  args: {
    as: 'h4',
    size: 'xs',
    children: 'Заголовок четвертого уровня (xs)',
  },
};

// Демонстрация всех вариантов в одной таблице
export const AllVariants = () => (
  <div style={{ display: 'grid', gap: '20px' }}>
    <Title as="h1" size="lg">
      h1 с размером lg (32px)
    </Title>
    <Title as="h2" size="md">
      h2 с размером md (24px)
    </Title>
    <Title as="h3" size="sm">
      h3 с размером sm (20px)
    </Title>
    <Title as="h4" size="xs">
      h4 с размером xs (16px)
    </Title>
  </div>
);
