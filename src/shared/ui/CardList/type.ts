import type { TSkillTag, TUserMain } from "../../api/types";

export type Skill = TSkillTag;
export type User = TUserMain;

export interface CardListProps {
  cards: User[];
  onLikeClick?: (userId: string) => void;
  onButtonClick?: (userId: string) => void;
}
