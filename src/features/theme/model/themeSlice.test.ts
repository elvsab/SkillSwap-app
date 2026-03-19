import { describe, expect, it } from "vitest";
import { themeReducer, toggleTheme } from "./themeSlice";

describe("themeSlice", () => {
  it("toggles from light to dark", () => {
    const state = themeReducer({ mode: "light" }, toggleTheme());
    expect(state.mode).toBe("dark");
  });

  it("toggles from dark to light", () => {
    const state = themeReducer({ mode: "dark" }, toggleTheme());
    expect(state.mode).toBe("light");
  });
});
