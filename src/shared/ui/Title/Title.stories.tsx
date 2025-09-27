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
export const Large: Story = {
  args: {
    as: 'h1',
    size: 'lg',
    children: 'Заголовок первого уровня (lg)',
  },
};

export const Medium: Story = {
  args: {
    as: 'h2',
    size: 'md',
    children: 'Заголовок второго уровня (md)',
  },
};

export const Small: Story = {
  args: {
    as: 'h3',
    size: 'sm',
    children: 'Заголовок третьего уровня (sm)',
  },
};

export const ExtraSmall: Story = {
  args: {
    as: 'h4',
    size: 'xs',
    children: 'Заголовок четвертого уровня (xs)',
  },
};

// Демонстрация всех вариантов в одной таблице
export const AllVariants = () => (
  <div style={{ display: 'grid', gap: '20px' }}>
    {(['h1', 'h2', 'h3', 'h4'] as const).map((tag) =>
      (['lg', 'md', 'sm', 'xs'] as const).map((size) => (
        <Title
          key={`${tag}-${size}`}
          as={tag}
          size={size}
        >
          {tag} с размером {size}
        </Title>
      ))
    )}
  </div>
);
