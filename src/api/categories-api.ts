import type { TCategory, TApiResponse } from "../shared/api/types";

export const getCategories = (): Promise<TApiResponse<TCategory[]>> =>
  fetch("/db/skills.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка");
      return response.json();
    })
    .then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const categories = data.map((item: any) => ({
        id: item.id,
        title: item.title,
    }));
      return { success: true as const, data: categories };
    })
    .catch((error) => ({
      success: false as const,
      error: { message: `Ошибка: ${error.message}` },
    }));
