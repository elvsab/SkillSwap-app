import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './input';

const meta: Meta<typeof Input> = {
    title: 'shared/ui/Input',
    component: Input,
    tags: ['autodocs'],
    args: {
        onChange: () => console.log('Input value has been changed')
    }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputEmail: Story = {
    args: {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Введите email',
    }
};

export const InputEmailFilled: Story = {
    args: {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Введите email',
        value: 'test_email@test.ru'
    }
};

export const InputEmailError: Story = {
    args: {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Введите email',
        value: 'test_email@test.ru',
        error: true,
        message: 'Email уже используется'
    }
};

export const InputName: Story = {
    args: {
        label: 'Имя',
        type: 'text',
        name: 'name',
        placeholder: 'Введите имя'
    }
};

export const InputWithExtraClass: Story = {
    args: {
        label: 'Имя',
        type: 'text',
        name: 'name',
        placeholder: 'Введите имя',
        className: 'input__name'
    }
};

export const InputWithoutLabel: Story = {
    args: {
        type: 'text',
        placeholder: 'Введите текст',
        name: 'test'
    }
};
