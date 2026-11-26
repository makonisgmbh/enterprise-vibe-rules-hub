import { useMemo, useState } from "react";
import { Check, Copy, Download, ShieldCheck, AlertTriangle } from "lucide-react";
import { MODULES, TARGETS, buildRuleFile, checkCode, type Target } from "@/lib/rules";
import { cn } from "@/lib/utils";

const SAMPLE = `const apiKey = "sk_live_9f8a7b6c5d";
const rows = db.query("SELECT * FROM users WHERE id = " + req.params.id);
function parse(input: any) { return eval(input); }`;

export function Generator() {
  const [selected, setSelected] = useState<string[]>(MODULES.map((m) => m.id));
  const [target, setTarget] = useState<Target>("cursor");
  const [project, setProject] = useState("");
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(SAMPLE);

  const output = useMemo(() => buildRuleFile(target, selected, project), [target, selected, project]);
  const findings = useMemo(() => checkCode(code, selected), [code, selected]);
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([output], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = TARGETS[target].file;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="generator" className="mx-auto max-w-6xl px-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">1 · Module wählen</p>
            <div className="mt-3 space-y-3">
              {MODULES.map((m) => {
                const on = selected.includes(m.id);
                return (
                  <button key={m.id} onClick={() => toggle(m.id)} aria-pressed={on}
                    className={cn("w-full rounded-lg border bg-card p-4 text-left transition", on ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70 hover:opacity-100")}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-primary">{m.tag} · {m.rules.length} Regeln</span>
                        <p className="font-semibold">{m.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{m.summary}</p>
                      </div>
                      <span className={cn("mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border", on ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                        {on && <Check className="h-3.5 w-3.5" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">2 · Ziel-Tool</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(Object.keys(TARGETS) as Target[]).map((t) => (
                <button key={t} onClick={() => setTarget(t)} aria-pressed={target === t}
                  className={cn("rounded-md border px-3 py-2 text-sm font-medium", target === t ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-card")}>
                  {TARGETS[t].label}
                </button>
              ))}
            </div>
            <label className="mt-4 block text-sm font-medium" htmlFor="project">Projektname</label>
            <input id="project" value={project} onChange={(e) => setProject(e.target.value)} placeholder="z. B. Customer Portal"
              className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-hidden focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-xl bg-code text-code-foreground">
            <div className="flex items-center justify-between gap-2 border-b border-code-foreground/10 px-4 py-3">
              <span className="font-mono text-sm">{TARGETS[target].file}</span>
              <div className="flex gap-2">
                <button onClick={copy} className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Kopiert" : "Kopieren"}
                </button>
                <button onClick={download} className="inline-flex items-center gap-1 rounded-md border border-code-foreground/20 px-3 py-1.5 text-sm">
                  <Download className="h-4 w-4" />Download
                </button>
              </div>
            </div>
            <pre className="max-h-[480px] overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">{output}</pre>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">3 · Regeln testen</p>
            <p className="mt-1 text-sm text-muted-foreground">Code einfügen und gegen die gewählten Module prüfen.</p>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={5} aria-label="Code zum Prüfen"
              className="mt-3 w-full rounded-md border border-input bg-background p-3 font-mono text-xs outline-hidden focus:ring-2 focus:ring-ring" />
            {findings.length === 0 ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-success"><ShieldCheck className="h-4 w-4" />Keine Verstöße gefunden</p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {findings.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-mono text-muted-foreground">Z.{f.line}</span>{f.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
