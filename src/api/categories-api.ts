import type { TCategory, TApiResponse } from "../shared/api/types";

export const getCategories = (): Promise<TApiResponse<TCategory[]>> =>
  fetch("/db/categories.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка");
      return response.json();
    })
    .then((data: TCategory[]) => ({
      success: true as const,
      data,
    }))
    .catch((error) => ({
      success: false as const,
      error: { message: `Ошибка: ${error.message}` },
    }));
