export type RuleModule = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  rules: string[];
};

export const MODULES: RuleModule[] = [
  {
    id: "security",
    title: "OWASP Top 10 Security & Secrets Prevention",
    tag: "Security",
    summary: "Verhindert Injection, unsichere Auth und geleakte Secrets im KI-generierten Code.",
    rules: [
      "Never hardcode secrets, API keys, tokens or connection strings. Read them from environment variables or a secret store (e.g. Azure Key Vault).",
      "Always use parameterized queries or an ORM. Never build SQL, NoSQL or shell commands via string concatenation with user input.",
      "Validate and sanitize all external input at trust boundaries using a schema library (e.g. zod, pydantic).",
      "Never use eval(), new Function(), or dynamic code execution on untrusted data.",
      "Escape output by default; never inject raw HTML (dangerouslySetInnerHTML, innerHTML) from user-controlled data.",
      "Enforce authentication and authorization checks server-side on every endpoint; never rely on client-side checks.",
      "Use vetted crypto libraries; never implement custom cryptography. Hash passwords with argon2id or bcrypt.",
      "Do not log secrets, tokens or personal data (GDPR).",
    ],
  },
  {
    id: "architecture",
    title: "Architecture Guardrails gegen Vibe Coding Debt",
    tag: "Architecture",
    summary: "Hält generierten Code modular, testbar und konsistent mit der Zielarchitektur.",
    rules: [
      "Follow the existing project structure and conventions; do not introduce new frameworks or patterns without an ADR.",
      "Keep functions under 50 lines and files under 400 lines; extract modules instead of growing files.",
      "Separate domain logic from I/O (HTTP, DB, UI). Domain code must be unit-testable without infrastructure.",
      "Do not duplicate logic: search the codebase for an existing helper before writing a new one.",
      "Every new feature ships with tests covering the business rules it introduces.",
      "Prefer explicit types; no `any` in TypeScript, no untyped public interfaces.",
      "Document non-obvious decisions with a short comment explaining why, not what.",
    ],
  },
  {
    id: "devsecops",
    title: "Enterprise DevSecOps CI-Gates",
    tag: "DevSecOps",
    summary: "Definiert Qualitäts- und Sicherheits-Gates, die jeder KI-Commit bestehen muss.",
    rules: [
      "All changes must pass lint, typecheck, unit tests and SAST (e.g. CodeQL, Semgrep) before merge.",
      "Run secret scanning (gitleaks / GitHub Secret Scanning) on every push; a finding blocks the pipeline.",
      "Pin dependency versions and run SCA (Dependabot, Trivy); no new dependency with known critical CVEs.",
      "Infrastructure changes are made via IaC (Bicep/Terraform) only, reviewed and policy-checked against the Azure Landing Zone.",
      "AI-generated pull requests require human review by a code owner.",
      "Never disable, skip or weaken tests or CI checks to make a build pass.",
    ],
  },
  {
    id: "saas",
    title: "SaaS Replacement Best Practices",
    tag: "SaaS Replacement",
    summary: "Leitplanken für den Ersatz teurer SaaS-Tools durch eigene, wartbare Anwendungen.",
    rules: [
      "Start from a documented feature inventory of the replaced SaaS; implement only features in active use.",
      "Provide data export/import paths and a migration script for existing SaaS data.",
      "Use managed platform services (Entra ID for SSO, Azure SQL/Postgres, Blob Storage) instead of self-built equivalents.",
      "Implement role-based access control and audit logging from day one.",
      "Design for multi-environment deployment (dev/test/prod) with configuration via environment.",
      "Track operating cost and ownership: every service has a named owner and a cost tag.",
    ],
  },
];

export type Target = "cursor" | "claude" | "copilot";

export const TARGETS: Record<Target, { label: string; file: string }> = {
  cursor: { label: "Cursor", file: ".cursorrules" },
  claude: { label: "Claude Code", file: "CLAUDE.md" },
  copilot: { label: "GitHub Copilot", file: "copilot-instructions.md" },
};

export function buildRuleFile(target: Target, ids: string[], project: string): string {
  const mods = MODULES.filter((m) => ids.includes(m.id));
  const name = project.trim() || "Enterprise Project";
  const header =
    target === "cursor"
      ? `# ${name} – AI Coding Rules (Cursor)`
      : target === "claude"
        ? `# CLAUDE.md – ${name}\n\nInstructions for Claude Code when working in this repository.`
        : `# Copilot Instructions – ${name}\n\n<!-- Place in .github/copilot-instructions.md -->`;
  const body = mods
    .map((m) => `## ${m.title}\n\n${m.rules.map((r) => `- ${r}`).join("\n")}`)
    .join("\n\n");
  const footer =
    "---\nBased on makonis/enterprise-vibe-coding-rules · Maintained by MAKONIS GmbH";
  return [header, body || "_No modules selected._", footer].join("\n\n") + "\n";
}

export type Finding = { module: string; message: string; line: number };

const CHECKS: { module: string; re: RegExp; message: string }[] = [
  { module: "security", re: /(api[_-]?key|secret|password|token)\s*[:=]\s*["'][^"']{6,}["']/i, message: "Hardcodiertes Secret gefunden" },
  { module: "security", re: /\beval\s*\(|new Function\s*\(/, message: "Dynamische Code-Ausführung (eval)" },
  { module: "security", re: /(SELECT|INSERT|UPDATE|DELETE)[^;\n]*["'`]\s*\+|\$\{[^}]+\}[^`]*(WHERE|VALUES)|(WHERE|VALUES)[^`]*\$\{/i, message: "SQL per String-Konkatenation" },
  { module: "security", re: /dangerouslySetInnerHTML|\.innerHTML\s*=/, message: "Unescaped HTML-Ausgabe" },
  { module: "architecture", re: /:\s*any\b|as any\b/, message: "Verwendung von `any`" },
  { module: "devsecops", re: /\b(it|test|describe)\.skip\(|eslint-disable|@ts-ignore/, message: "Deaktivierter Test oder Check" },
];

export function checkCode(code: string, ids: string[]): Finding[] {
  const out: Finding[] = [];
  code.split("\n").forEach((line, i) => {
    for (const c of CHECKS) {
      if (ids.includes(c.module) && c.re.test(line)) out.push({ module: c.module, message: c.message, line: i + 1 });
    }
  });
  return out;
}
