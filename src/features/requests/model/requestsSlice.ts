import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/providers/store";
import type { TExchangeRequest, TExchangeRequestStatus } from "../../../shared/api/types";
import { getRequests, saveRequests } from "../../../shared/lib/skillswap-storage";

type RequestsState = {
  items: TExchangeRequest[];
};

const initialState: RequestsState = {
  items: getRequests(),
};

const persist = (items: TExchangeRequest[]) => {
  saveRequests(items);
  return items;
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    hydrateRequests(state) {
      state.items = getRequests();
    },
    addRequest(state, action: PayloadAction<TExchangeRequest>) {
      state.items = persist([action.payload, ...state.items]);
    },
    updateRequestStatus(
      state,
      action: PayloadAction<{ id: string; status: TExchangeRequestStatus }>
    ) {
      state.items = persist(
        state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                status: action.payload.status,
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      );
    },
  },
});

export const { hydrateRequests, addRequest, updateRequestStatus } =
  requestsSlice.actions;

export const selectRequests = (state: RootState) => state.requests.items;

export const requestsReducer = requestsSlice.reducer;
