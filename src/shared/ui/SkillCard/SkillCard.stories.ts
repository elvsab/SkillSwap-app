import type { Meta, StoryObj } from "@storybook/react";
import { SkillCard } from "./SkillCard";
import type { User } from "./types";

const meta = {
    title: "shared/ui/SkillCard",
    component: SkillCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {},
} satisfies Meta<typeof SkillCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Пример моковых пользователей 
const mockUsers: User[] = [
  {
    id: "1",
    name: "Иван",
    dateOfBirth: "1991-06-08",
    gender: "Мужской",
    city: "Санкт-Петербург",
    avatar: "https://example.com/avatar1.png",
    login: "user1@mail.ru",
    password: "Password1",
    skillsCanTeach: [
      { id: "101", title: "Управление командой", color: "#E3F2FD" },
      { id: "102", title: "Маркетинг и реклама", color: "#E3F2FD" },
    ],
    skillsWantsToLearn: [{ id: "205", title: "Китайский", color: "#FFEBEE" }],
    isNew: false,
    isPopular: true,
  },
  {
      id: "4",
      name: "Илона",
      dateOfBirth: "1993-07-19",
      gender: "Женский",
      city: "Новосибирск",
      avatar: "https://example.com/avatar4.png",
      login: "user4@mail.ru",
      password: "Password4",
      skillsCanTeach: [{ id: "107", title: "Проектное управление", color: "#E3F2FD" }],
      skillsWantsToLearn: [{ id: "206", title: "Японский", color: "#E8F5E9" }],
      isNew: false,
      isPopular: false,
    },
];


export const Default: Story = {
  args: {
    user: mockUsers[0],
    onLikeClick: (id: string) => console.log(`Liked user with id: ${id}`),
    onButtonClick: (id: string) => console.log(`Details for user with id: ${id}`),
  },
};

export const SingleSkill: Story = {
  args: {
    user: mockUsers[1],
    onLikeClick: (id: string) => console.log(`Liked user with id: ${id}`),
    onButtonClick: (id: string) => console.log(`Details for user with id: ${id}`),
  },
};
