import type { TCategory, TApiResponse } from "../shared/api/types";

type RawCategory = {
  id: string;
  title: string;
};

export const getCategories = (): Promise<TApiResponse<TCategory[]>> =>
  fetch("/db/skills.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка");
      return response.json();
    })
    .then((data: RawCategory[]) => {
      const categories = data.map((item) => ({
        id: item.id,
        title: item.title,
      }));
      return { success: true as const, data: categories };
    })
    .catch((error) => ({
      success: false as const,
      error: { message: `Ошибка: ${error.message}` },
    }));
