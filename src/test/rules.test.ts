import { describe, expect, it } from "vitest";
import { buildRuleFile, checkCode } from "@/lib/rules";

describe("rule generator", () => {
  it("includes only selected modules", () => {
    const f = buildRuleFile("claude", ["security"], "X");
    expect(f).toContain("OWASP");
    expect(f).not.toContain("SaaS Replacement Best Practices");
  });
  it("flags hardcoded secrets only when security is selected", () => {
    const code = 'const apiKey = "sk_live_123456789";';
    expect(checkCode(code, ["security"])).toHaveLength(1);
    expect(checkCode(code, ["architecture"])).toHaveLength(0);
  });
});
