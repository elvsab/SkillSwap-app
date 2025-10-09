import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TUser } from "../../../shared/api/types";
import type { RootState } from "../../../app/providers/store";

// Тип состояния аутентификации
type AuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
};

// Начальное состояние
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// ==== Асинхронные Thunks ====

// Авторизация (мок + сохранение в localStorage)
export const loginUser = createAsyncThunk<
  { token: string; user: TUser },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // имитация задержки API
    await new Promise((resolve) => setTimeout(resolve, 700));

    const mockUser: TUser = {
      id: "1",
      name: "Maria",
      email: credentials.email,
      birthDate: "1999-09-28",
      gender: "Женский",
      city: "Алматы",
      createdProfile: new Date().toISOString(),
      skillCanTeach: {
        id: "101",
        subcategoryId: "frontend",
        name: "Frontend",
        description: "Разработка интерфейсов на React, TypeScript и JS",
        images: [],
      },
      subcategoriesWantToLearn: ["UI/UX", "Backend"],
      likes: [],
      favorites: [],
      skillExchanges: [],
    };

    const token = "token123";

    // сохраняем в localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(mockUser));

    // возвращаем в Redux
    return { token, user: mockUser };
  } catch {
    return rejectWithValue("Ошибка входа");
  }
});

// Регистрация
export const registerUser = createAsyncThunk<
  { token: string; user: TUser },
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const newUser: TUser = {
      id: "2",
      name: data.name,
      email: data.email,
      birthDate: "2000-01-01",
      gender: "Женский",
      city: "Астана",
      createdProfile: new Date().toISOString(),
      skillCanTeach: {
        id: "201",
        subcategoryId: "design",
        name: "Design",
        description: "Графический и UI-дизайн",
        images: [],
      },
      subcategoriesWantToLearn: ["Frontend"],
      likes: [],
      favorites: [],
      skillExchanges: [],
    };

    const token = "token123";

    // сохраняем данные
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(newUser));

    return { token, user: newUser };
  } catch {
    return rejectWithValue("Ошибка регистрации");
  }
});

// Обновление профиля
export const updateProfile = createAsyncThunk<
  TUser,
  Partial<TUser>,
  { state: { auth: AuthState }; rejectValue: string }
>("auth/updateProfile", async (updatedData, { getState, rejectWithValue }) => {
  try {
    const { user } = getState().auth;
    if (!user) throw new Error("Пользователь не найден");

    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  } catch {
    return rejectWithValue("Ошибка обновления профиля");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // ==== LOGIN ====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка входа";
      })

      // ==== REGISTER ====
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка регистрации";
      })

      // ==== UPDATE PROFILE ====
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка обновления профиля";
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

// ---- Селекторы ----
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
