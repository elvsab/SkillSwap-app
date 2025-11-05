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
  skillsCanTeach: Array<{ id: string; title: string }>;
  skillsWantsToLearn: Array<{ id: string; title: string }>;
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