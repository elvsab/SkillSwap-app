import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/providers/store";
import {
  applyThemeToDocument,
  getThemePreference,
  saveThemePreference,
} from "../../../shared/lib/skillswap-storage";

type ThemeState = {
  mode: "light" | "dark";
};

const initialMode = getThemePreference();
applyThemeToDocument(initialMode);

const initialState: ThemeState = {
  mode: initialMode,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    hydrateTheme(state) {
      state.mode = getThemePreference();
      applyThemeToDocument(state.mode);
    },
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      saveThemePreference(state.mode);
      applyThemeToDocument(state.mode);
    },
  },
});

export const { hydrateTheme, toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state: RootState) => state.theme.mode;
export const themeReducer = themeSlice.reducer;
