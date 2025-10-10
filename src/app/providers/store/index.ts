import { configureStore } from "@reduxjs/toolkit";
// TODO: Re-enable slices once TypeScript module resolution is fixed
// import { filtersReducer } from '../../features/filters/model/filtersSlice'
// import { skillsReducer } from '../../entities/skills/model/skillsSlice'
import { authReducer } from "../../../features/auth/model/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // filters: filtersReducer,
    // skills: skillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for use in components
export { useDispatch, useSelector } from "react-redux";
export type { TypedUseSelectorHook } from "react-redux";

export default store;
