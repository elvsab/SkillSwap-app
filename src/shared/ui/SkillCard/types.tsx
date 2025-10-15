export type User = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: 'Мужской' | 'Женский' | string;
    city: string;
    avatar: string;
    login: string;
    password: string;
    skillsCanTeach: Skill[];
    skillsWantsToLearn: Skill[];
    isNew: boolean;
    isPopular: boolean;
};

export type UserCardProps = {
  user: User;
  onLikeClick?: (userId: string) => void;
  onButtonClick?: (userId: string) => void;
};

export type Skill = {
  id: string;
  title: string;
  color: string;
}; 