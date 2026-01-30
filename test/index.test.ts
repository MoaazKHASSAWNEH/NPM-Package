import { describe, it, expect } from "vitest";
import { hello } from "../src/index";

describe("pkg_name", () => {
  it("should say hello", () => {
    expect(hello("pkg_name")).toContain("pkg_name");
  });
});
