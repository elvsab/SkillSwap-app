import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../../../features/auth/model/authSlice";
import { skillsReducer } from "../../../entities/skills/model/skillsSlice";
import { filtersReducer } from "../../../features/filters/model/filtersSlice";
import { usersReducer } from "../../../entities/users/model/usersSlice";
import { favoritesReducer } from '../../../features/favorites/model/favoritesSlice';
import { requestsReducer } from "../../../features/requests/model/requestsSlice";
import { notificationsReducer } from "../../../features/notifications/model/notificationsSlice";
import { themeReducer } from "../../../features/theme/model/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
    filters: filtersReducer,
    users: usersReducer,
    favorites: favoritesReducer,
    requests: requestsReducer,
    notifications: notificationsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for use in components
export { useDispatch, useSelector } from "react-redux";
export type { TypedUseSelectorHook } from "react-redux";

export default store;
