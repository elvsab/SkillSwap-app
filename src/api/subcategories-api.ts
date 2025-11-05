import type { TSubcategory, TApiResponse } from "../shared/api/types";

export const getSubcategories = (): Promise<TApiResponse<TSubcategory[]>> =>
  fetch("/db/skills.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка");
      return response.json();
    })
    .then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subcategories = data.flatMap((category: any) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        category.subCategories.map((sub: any) => ({
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
