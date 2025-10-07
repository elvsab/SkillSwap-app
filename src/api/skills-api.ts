import type { TSkill, TApiResponse } from "../shared/api/types";

export const getSkills = (): Promise<TApiResponse<TSkill[]>> =>
  fetch("/db/skills.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка");
      return response.json();
    })
    .then((data: TSkill[]) => ({
      success: true as const,
      data,
    }))
    .catch((error) => ({
      success: false as const,
      error: { message: `Ошибка: ${error.message}` },
    }));
