import {
  createSlice,
  createAsyncThunk,
  createSelector,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
// RootState will be defined in the store file
import { getCategories } from "../../../api/categories-api";
import { getSubcategories } from "../../../api/subcategories-api";
import { getSkills } from "../../../api/skills-api";
import type {
  TCategory,
  TSubcategory,
  TSkill,
} from "../../../shared/api/types";

interface SkillsState {
  categories: TCategory[];
  subcategories: TSubcategory[];
  skills: TSkill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  categories: [],
  subcategories: [],
  skills: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "skills/fetchCategories",
  async (_, { rejectWithValue }) => {
    const response = await getCategories();
    if (response.success) return response.data;
    return rejectWithValue(response.error.message);
  }
);

export const fetchSubcategories = createAsyncThunk(
  "skills/fetchSubcategories",
  async (_, { rejectWithValue }) => {
    const response = await getSubcategories();
    if (response.success) return response.data;
    return rejectWithValue(response.error.message);
  }
);

export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue }) => {
    const response = await getSkills();
    if (response.success) return response.data;
    return rejectWithValue(response.error.message);
  }
);

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategories = action.payload;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addMatcher(
        isPending(fetchCategories, fetchSubcategories, fetchSkills),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isFulfilled(fetchCategories, fetchSubcategories, fetchSkills),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isRejected(fetchCategories, fetchSubcategories, fetchSkills),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const skillsReducer = skillsSlice.reducer;

export const selectCategories = (state: any) => state.skills.categories;
export const selectSubcategories = (state: any) =>
  state.skills.subcategories;
export const selectSubcategorieById = (state: any, id: string) =>
  state.skills.subcategories.find((sub: TSubcategory) => sub.id === id);
export const selectAllSkills = (state: any) => state.skills.skills;
export const selectSkillsLoading = (state: any) => state.skills.loading;
export const selectSkillsError = (state: any) => state.skills.error;

export const selectCategoriesForFilter = createSelector(
  [selectCategories, selectSubcategories],
  (categories, subcategories) => {
    const subcategoriesByCategoryId: Record<string, TSubcategory[]> = {};
    subcategories.forEach((sub: TSubcategory) => {
      if (!subcategoriesByCategoryId[sub.categoryId]) {
        subcategoriesByCategoryId[sub.categoryId] = [];
      }
      subcategoriesByCategoryId[sub.categoryId].push(sub);
    });
    return categories.map((category: TCategory) => ({
      ...category,
      subcategories: subcategoriesByCategoryId[category.id] || [],
    }));
  }
);

export const selectSubcategoryToCategoryMap = createSelector(
  [selectSubcategories],
  (subcategories) =>
    subcategories.reduce((acc: Record<string, string>, sub: TSubcategory) => {
      acc[sub.id] = sub.categoryId;
      return acc;
    }, {})
);
