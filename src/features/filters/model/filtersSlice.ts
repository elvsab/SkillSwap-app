import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  mode: "all" | "canTeach" | "wantToLearn";
  skillIds: string[];
  gender: "Мужской" | "Женский" | null;
  city: string[];
  searchQuery: string;
};

const initialState: FiltersState = {
  mode: "all",
  skillIds: [],
  gender: null,
  city: [],
  searchQuery: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<FiltersState["mode"]>) {
      state.mode = action.payload;
    },
    setSkillIds(state, action: PayloadAction<string[]>) {
      state.skillIds = action.payload;
    },
    setGender(state, action: PayloadAction<FiltersState["gender"]>) {
      state.gender = action.payload;
    },
    addCity(state, action: PayloadAction<string>) {
      if (!state.city.includes(action.payload)) {
        state.city.push(action.payload);
      }
    },
    removeCity(state, action: PayloadAction<string>) {
      state.city = state.city.filter((city) => city !== action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetFilters() {
      return { ...initialState, searchQuery: "" };
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const filtersActions = filtersSlice.actions;

export const selectMode = (state: any) => state.filters.mode;
export const selectSkillIds = (state: any) => state.filters.skillIds;
export const selectGender = (state: any) => state.filters.gender;
export const selectCity = (state: any) => state.filters.city;
export const selectSearchQuery = (state: any) =>
  state.filters.searchQuery;
