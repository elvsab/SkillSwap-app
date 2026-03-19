import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/providers/store";
import type { TNotification } from "../../../shared/api/types";
import {
  clearReadNotifications,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  saveNotifications,
} from "../../../shared/lib/skillswap-storage";

type NotificationsState = {
  items: TNotification[];
  toasts: TNotification[];
};

const initialState: NotificationsState = {
  items: getNotifications(),
  toasts: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    hydrateNotifications(state) {
      state.items = getNotifications();
    },
    addNotification(state, action: PayloadAction<TNotification>) {
      state.items = [action.payload, ...state.items];
      saveNotifications(state.items);
      state.toasts = [action.payload, ...state.toasts].slice(0, 3);
    },
    readNotification(state, action: PayloadAction<string>) {
      markNotificationRead(action.payload);
      state.items = getNotifications();
    },
    readAllNotifications(state) {
      markAllNotificationsRead();
      state.items = getNotifications();
    },
    removeReadNotifications(state) {
      clearReadNotifications();
      state.items = getNotifications();
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const {
  hydrateNotifications,
  addNotification,
  readNotification,
  readAllNotifications,
  removeReadNotifications,
  dismissToast,
} = notificationsSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notifications.items;
export const selectUnreadNotifications = (state: RootState) =>
  state.notifications.items.filter((item) => !item.read);
export const selectToasts = (state: RootState) => state.notifications.toasts;

export const notificationsReducer = notificationsSlice.reducer;
