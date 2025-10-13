import {
  createSlice,
  createSelector,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TUserMain } from "../../../shared/api/types";
import type { RootState } from "../../../app/providers/store";

export interface UsersState {
  list: TUserMain[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/db/users.json");
      if (!response.ok) throw new Error("Ошибка загрузки");
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  }
);

export const fetchPopularUsers = createAsyncThunk(
  "users/fetchPopularUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/db/users.json");
      if (!response.ok)
        throw new Error("Ошибка загрузки популярных пользователей");
      const data = await response.json();
      return data.slice(0, 5); // Первые 5 как популярные
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  }
);

export const fetchRecentUsers = createAsyncThunk(
  "users/fetchRecentUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/db/users.json");
      if (!response.ok)
        throw new Error("Ошибка загрузки недавних пользователей");
      const data = await response.json();
      return data.slice(5, 10); // Следующие 5 как недавние
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  }
);

export const fetchNewUsers = createAsyncThunk(
  "users/fetchNewUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/db/users.json");
      if (!response.ok) throw new Error("Ошибка загрузки новых пользователей");
      const data = await response.json();
      return data.slice(10, 15); // Следующие 5 как новые
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  }
);

// Вспомогательные функции для фильтрации
export const getTeachingSkills = (user: TUserMain, subcategories: string[]) => {
  if (subcategories.length === 0) return user.skillsCanTeach;
  return user.skillsCanTeach.filter((skill) =>
    subcategories.includes(skill.id)
  );
};

export const getLearningSkills = (user: TUserMain, subcategories: string[]) => {
  if (subcategories.length === 0) return user.skillsWantsToLearn;
  return user.skillsWantsToLearn.filter((skill) =>
    subcategories.includes(skill.id)
  );
};

// Тип для фильтров
export interface Filters {
  mode: "all" | "canTeach" | "wantToLearn";
  skillIds: string[];
  gender: "Мужской" | "Женский" | null;
  city: string[];
  searchQuery: string;
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<TUserMain[]>) {
      state.list = action.payload;
    },
    addUser(state, action: PayloadAction<TUserMain>) {
      state.list.push(action.payload);
    },
    updateUser(
      state,
      action: PayloadAction<{ id: string; updates: Partial<TUserMain> }>
    ) {
      const index = state.list.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload.updates };
      }
    },
    removeUser(state, action: PayloadAction<string>) {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch users";
      })
      .addCase(fetchPopularUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularUsers.fulfilled, (state, action) => {
        state.loading = false;
        // Добавляем популярных пользователей к существующему списку
        state.list = [...state.list, ...action.payload];
      })
      .addCase(fetchPopularUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch popular users";
      })
      .addCase(fetchRecentUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentUsers.fulfilled, (state, action) => {
        state.loading = false;
        // Добавляем недавних пользователей к существующему списку
        state.list = [...state.list, ...action.payload];
      })
      .addCase(fetchRecentUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch recent users";
      })
      .addCase(fetchNewUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewUsers.fulfilled, (state, action) => {
        state.loading = false;
        // Добавляем новых пользователей к существующему списку
        state.list = [...state.list, ...action.payload];
      })
      .addCase(fetchNewUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch new users";
      });
  },
});

export const { setUsers, addUser, updateUser, removeUser } = usersSlice.actions;

// Селекторы
export const selectUsers = (state: RootState) => state.users.list;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;

// Селектор для фильтрации пользователей
export const selectUsersFiltered = createSelector(
  [selectUsers, (_: RootState, filters: Filters) => filters],
  (users, filters) => {
    return users.filter((user) => {
      // Фильтр по полу
      const matchesGender =
        filters.gender === null || user.gender === filters.gender;

      // Фильтр по городам
      const matchesCity =
        filters.city.length === 0 || filters.city.includes(user.city);

      // Фильтр по режиму (навыкам)
      let matchesMode = true;
      if (filters.mode === "canTeach") {
        matchesMode = getTeachingSkills(user, filters.skillIds).length > 0;
      } else if (filters.mode === "wantToLearn") {
        matchesMode = getLearningSkills(user, filters.skillIds).length > 0;
      } else if (filters.mode === "all") {
        matchesMode =
          getLearningSkills(user, filters.skillIds).length > 0 ||
          getTeachingSkills(user, filters.skillIds).length > 0;
      }

      // Фильтр по поисковому запросу
      const matchesSearch =
        filters.searchQuery === "" ||
        user.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        user.skillsCanTeach.some((skill) =>
          skill.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
        ) ||
        user.skillsWantsToLearn.some((skill) =>
          skill.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );

      return matchesGender && matchesCity && matchesMode && matchesSearch;
    });
  }
);

// Селектор для получения пользователя по ID
export const selectUserById = createSelector(
  [selectUsers, (_: RootState, userId: string) => userId],
  (users, userId) => users.find((user) => user.id === userId)
);

// Селектор для популярных пользователей (первые 5)
export const selectPopularUsers = createSelector([selectUsers], (users) =>
  users.slice(0, 5)
);

// Селектор для недавних пользователей (следующие 5)
export const selectRecentUsers = createSelector([selectUsers], (users) =>
  users.slice(5, 10)
);

// Селектор для новых пользователей (следующие 5)
export const selectNewUsers = createSelector([selectUsers], (users) =>
  users.slice(10, 15)
);

export const usersReducer = usersSlice.reducer;
