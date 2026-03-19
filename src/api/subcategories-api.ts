import type { TSubcategory, TApiResponse } from "../shared/api/types";

type RawSubcategory = {
  id: string;
  title: string;
};

type RawCategory = {
  id: string;
  subCategories: RawSubcategory[];
};

export const getSubcategories = (): Promise<TApiResponse<TSubcategory[]>> =>
  fetch("/db/skills.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка");
      return response.json();
    })
    .then((data: RawCategory[]) => {
      const subcategories = data.flatMap((category) =>
        category.subCategories.map((sub) => ({
          id: sub.id,
          title: sub.title,
          categoryId: category.id,
        }))
      );
      return { success: true as const, data: subcategories };
    })
    .catch((error) => ({
      success: false as const,
      error: { message: `Ошибка: ${error.message}` },
    }));
