import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { favoritesApi, type FavoriteItem, type FavoritesData } from "../../../api/favorites-api";
import type { RootState } from "../../../app/providers/store";

export interface FavoritesState {
  favoriteUsers: FavoriteItem[];
  favoriteSkills: FavoriteItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favoriteUsers: [],
  favoriteSkills: [],
  loading: false,
  error: null,
};

// Асинхронные thunk-функции
export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (
    { id, type, title }: { id: string; type: 'user' | 'skill'; title?: string },
    { rejectWithValue }
  ) => {
    const response = await favoritesApi.addToFavorites(id, type, title);
    if (response.success) {
      return { id, type, title };
    }
    return rejectWithValue(response.error.message);
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (
    { id, type }: { id: string; type: 'user' | 'skill' },
    { rejectWithValue }
  ) => {
    const response = await favoritesApi.removeFromFavorites(id, type);
    if (response.success) {
      return { id, type };
    }
    return rejectWithValue(response.error.message);
  }
);

export const fetchUserFavorites = createAsyncThunk(
  'favorites/fetchUserFavorites',
  async (_, { rejectWithValue }) => {
    const response = await favoritesApi.fetchFavorites();
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.error.message);
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoritesError: (state) => {
      state.error = null;
    },
    clearAllFavorites: (state) => {
      state.favoriteUsers = [];
      state.favoriteSkills = [];
      localStorage.setItem('favorites', JSON.stringify({ users: [], skills: [] }));
    },
  },
  extraReducers: (builder) => {
    builder
      // addToFavorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        const { id, type, title } = action.payload;
        const newItem: FavoriteItem = {
          id,
          type,
          title,
          addedAt: new Date().toISOString()
        };

        if (type === 'user') {
          if (!state.favoriteUsers.some(user => user.id === id)) {
            state.favoriteUsers.push(newItem);
          }
        } else {
          if (!state.favoriteSkills.some(skill => skill.id === id)) {
            state.favoriteSkills.push(newItem);
          }
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // removeFromFavorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        const { id, type } = action.payload;
        
        if (type === 'user') {
          state.favoriteUsers = state.favoriteUsers.filter(user => user.id !== id);
        } else {
          state.favoriteSkills = state.favoriteSkills.filter(skill => skill.id !== id);
        }
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchUserFavorites
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteUsers = action.payload.users;
        state.favoriteSkills = action.payload.skills;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFavoritesError, clearAllFavorites } = favoritesSlice.actions;

// Селекторы
export const selectFavorites = (state: RootState) => state.favorites;
export const selectFavoriteUsers = (state: RootState) => state.favorites.favoriteUsers;
export const selectFavoriteSkills = (state: RootState) => state.favorites.favoriteSkills;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;

export const selectIsUserFavorite = (state: RootState, userId: string) => 
  state.favorites.favoriteUsers.some(user => user.id === userId);

export const selectIsSkillFavorite = (state: RootState, skillId: string) => 
  state.favorites.favoriteSkills.some(skill => skill.id === skillId);

export const favoritesReducer = favoritesSlice.reducer;