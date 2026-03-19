export type TCategory = {
  id: string;
  title: string;
  //icon: string;
};

export type TSubcategory = {
  id: string;
  title: string;
  categoryId: string;
};

export type TSkill = {
  id: string;
  subcategoryId?: string;
  title: string;
  description?: string;
  images?: string[];
};

export type TSkillTag = {
  id: string;
  title: string;
  color?: string;
};

export type TSkillType = "canTeach" | "wantToLearn";

export type TExchangeRequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "inProgress"
  | "done";

export type TNotification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  actionLabel?: string;
  actionPath?: string;
};

export type TCreatedSkill = {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerCity: string;
  ownerGender: "Мужской" | "Женский";
  ownerBirthDate: string;
  ownerAvatar?: string;
  title: string;
  description: string;
  type: TSkillType;
  category: string;
  image?: string;
  tags: string[];
  createdAt: string;
};

export type TExchangeRequest = {
  id: string;
  skillId: string;
  fromUserId: string;
  toUserId: string;
  status: TExchangeRequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  gender: "Мужской" | "Женский";
  city: string;
  aboutUser?: string;
  avatarUrl?: string;
  createdProfile: string;
  createdSkills?: TCreatedSkill[];
  skillCanTeach: TSkill;
  subcategoriesWantToLearn: string[];
  likes: string[];
  favorites: string[];
  skillExchanges?: string[];
};

export type TUserMain = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: "Мужской" | "Женский";
  city: string;
  avatar: string;
  login: string;
  password: string;
  skillsCanTeach: TSkillTag[];
  skillsWantsToLearn: TSkillTag[];
  isNew?: boolean;
  isPopular?: boolean;
  ownerId?: string;
  title?: string;
  description?: string;
  category?: string;
  image?: string;
  gallery?: string[];
  tags?: string[];
  createdAt?: string;
};

type TSuccessResponse<T> = {
  success: true;
  data: T;
};

type TErrorResponse = {
  success: false;
  error: { message: string };
};

export type TApiResponse<T> = TSuccessResponse<T> | TErrorResponse;
