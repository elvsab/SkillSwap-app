import type { TApiResponse } from "../shared/api/types";

export type FavoriteItem = {
  id: string;
  type: 'user' | 'skill';
  title?: string;
  addedAt: string;
};

export type FavoritesData = {
  users: FavoriteItem[];
  skills: FavoriteItem[];
};

export const favoritesApi = {
  addToFavorites: (itemId: string, type: 'user' | 'skill', title?: string): Promise<TApiResponse<void>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const favorites = JSON.parse(localStorage.getItem('favorites') || '{"users":[],"skills":[]}');
          const newItem: FavoriteItem = {
            id: itemId,
            type,
            title,
            addedAt: new Date().toISOString()
          };

          if (!favorites[`${type}s`].some((item: FavoriteItem) => item.id === itemId)) {
            favorites[`${type}s`].push(newItem);
            localStorage.setItem('favorites', JSON.stringify(favorites));
          }

          resolve({ success: true, data: undefined });
        } catch {
          resolve({ 
            success: false, 
            error: { message: 'Ошибка при добавлении в избранное' } 
          });
        }
      }, 300);
    });
  },

  removeFromFavorites: (itemId: string, type: 'user' | 'skill'): Promise<TApiResponse<void>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const favorites = JSON.parse(localStorage.getItem('favorites') || '{"users":[],"skills":[]}');
          favorites[`${type}s`] = favorites[`${type}s`].filter((item: FavoriteItem) => item.id !== itemId);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          resolve({ success: true, data: undefined });
        } catch {
          resolve({ 
            success: false, 
            error: { message: 'Ошибка при удалении из избранного' } 
          });
        }
      }, 300);
    });
  },

  fetchFavorites: (): Promise<TApiResponse<FavoritesData>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const favorites = JSON.parse(localStorage.getItem('favorites') || '{"users":[],"skills":[]}');
          resolve({ success: true, data: favorites });
        } catch {
          resolve({ 
            success: false, 
            error: { message: 'Ошибка при загрузке избранного' } 
          });
        }
      }, 500);
    });
  }
};
