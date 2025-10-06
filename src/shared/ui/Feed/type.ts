import { type User } from '../SkillCard/types'

export interface FeedProps {
  title: string;
  cards: User[]; // массив карточек
  handleShowAll?: () => void;
  onLikeClick?: (userId: string) => void;
  onButtonClick?: (userId: string) => void;
}