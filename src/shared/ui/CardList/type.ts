// import { ReactNode } from 'react';

export interface Skill {
  id: string;
  title: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  city: string;
  dateOfBirth: string;
  skillsCanTeach: Skill[];
  skillsWantsToLearn: Skill[];
}

export interface CardListProps {
  cards: User[];
  onLikeClick?: (userId: string) => void;
  onButtonClick?: (userId: string) => void;
}