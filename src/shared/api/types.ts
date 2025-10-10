export type TCategory = {
  id: string;
  name: string;
  icon: string;
};

export type TSubcategory = {
  id: string;
  name: string;
  categoryId: string;
};

export type TSkill = {
  id: string;
  subcategoryId: string;
  name: string;
  description: string;
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

type TSuccessResponse<T> = {
  success: true;
  data: T;
};

type TErrorResponse = {
  success: false;
  error: { message: string };
};

export type TApiResponse<T> = TSuccessResponse<T> | TErrorResponse;
