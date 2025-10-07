import type { TSubcategory, TApiResponse } from "../shared/api/types";

export const getSubcategories = (): Promise<TApiResponse<TSubcategory[]>> =>
  fetch("/db/subcategories.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка");
      return response.json();
    })
    .then((data: TSubcategory[]) => ({
      success: true as const,
      data,
    }))
    .catch((error) => ({
      success: false as const,
      error: { message: `Ошибка: ${error.message}` },
    }));
