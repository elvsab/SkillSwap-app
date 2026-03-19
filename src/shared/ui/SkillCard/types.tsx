import type { TSkillTag, TUserMain } from "../../api/types";

export type User = TUserMain;

export type UserCardProps = {
  user: User;
  onLikeClick?: (userId: string) => void;
  onButtonClick?: (userId: string) => void;
};

export type Skill = TSkillTag;
