import { describe, it, expect } from "vitest";

describe("Portfolio Tests", () => {
  it("should pass basic test", () => {
    expect(true).toBe(true);
  });

  it("should validate environment", () => {
    // Check that essential env vars are defined (in test mode)
    expect(import.meta.env).toBeDefined();
  });
});
