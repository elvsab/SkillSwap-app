import { describe, expect, it } from "vitest";
import {
  addRequest,
  requestsReducer,
  updateRequestStatus,
} from "./requestsSlice";

describe("requestsSlice", () => {
  it("adds request to the beginning of the list", () => {
    const state = requestsReducer(
      { items: [] },
      addRequest({
        id: "r1",
        skillId: "s1",
        fromUserId: "u1",
        toUserId: "u2",
        status: "pending",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      })
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].status).toBe("pending");
  });

  it("updates request status", () => {
    const state = requestsReducer(
      {
        items: [
          {
            id: "r1",
            skillId: "s1",
            fromUserId: "u1",
            toUserId: "u2",
            status: "pending",
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
          },
        ],
      },
      updateRequestStatus({ id: "r1", status: "accepted" })
    );

    expect(state.items[0].status).toBe("accepted");
  });
});
