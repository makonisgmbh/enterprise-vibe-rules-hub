import { createFileRoute } from "@tanstack/react-router";
import { MODULES } from "@/lib/rules";
import { LINKS } from "@/lib/links";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Vibe Coding Governance – MAKONIS Standards" },
      { name: "description", content: "Strukturierte Governance für KI-gestützte Softwareentwicklung im Enterprise-Umfeld." },
      { property: "og:title", content: "Vibe Coding Governance nach MAKONIS-Standards" },
      { property: "og:description", content: "Prinzipien, Rollen, Gates und Regelmodule für Enterprise Vibe Coding." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Governance,
});

const PILLARS = [
  { n: "01", t: "Policy as Prompt", d: "Unternehmensrichtlinien werden als versionierte Regeldateien im Repo gepflegt und gelten für jedes KI-Tool gleich." },
  { n: "02", t: "Human in the Loop", d: "Jeder KI-generierte Pull Request wird von einem Code Owner geprüft. Keine Auto-Merges." },
  { n: "03", t: "Automatisierte Gates", d: "SAST, Secret Scanning und SCA blockieren unsichere Änderungen, bevor sie main erreichen." },
  { n: "04", t: "Plattform-Fundament", d: "Deployments laufen ausschließlich in eine Azure Landing Zone mit Policies, Netzwerk- und Identitätsgrenzen." },
];

const ROLES = [
  ["CTO / Engineering Lead", "Gibt Regelmodule frei, definiert Risikoklassen"],
  ["Code Owner", "Reviewt KI-PRs, verantwortet Architekturkonformität"],
  ["Platform Team", "Betreibt CI-Gates und Landing Zone"],
  ["Entwickler:in", "Nutzt KI-Tools innerhalb der Regeldateien"],
];

function Governance() {
  return (
    <main className="mx-auto max-w-4xl px-6 pt-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Dokumentation</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">Vibe Coding Governance</h1>
      <p className="mt-4 text-lg text-muted-foreground">Das MAKONIS-Framework für KI-gestützte Entwicklung: schnell bauen, ohne Sicherheits- und Architekturschulden aufzubauen.</p>

      <h2 className="mt-14 text-2xl font-bold">Die vier Säulen</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <div key={p.n} className="rounded-lg border border-border bg-card p-5">
            <span className="font-mono text-sm text-primary">{p.n}</span>
            <h3 className="mt-1 font-semibold">{p.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold">Rollen & Verantwortung</h2>
      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-card">
        {ROLES.map(([r, d]) => (
          <div key={r} className="grid gap-1 p-4 sm:grid-cols-[220px_1fr]">
            <span className="font-semibold">{r}</span><span className="text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold">Regelmodule im Detail</h2>
      <div className="mt-6 space-y-8">
        {MODULES.map((m) => (
          <section key={m.id}>
            <span className="text-xs font-semibold uppercase text-primary">{m.tag}</span>
            <h3 className="text-xl font-semibold">{m.title}</h3>
            <p className="mt-1 text-muted-foreground">{m.summary}</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
              {m.rules.map((r) => <li key={r}>{r}</li>)}
            </ol>
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-xl border-l-4 border-primary bg-accent p-6">
        <p className="font-semibold">Governance einführen, ohne Tempo zu verlieren?</p>
        <p className="mt-1 text-sm text-muted-foreground">Wir setzen das Framework in einem SaaS Replacement Sprint mit Ihrem Team um.</p>
        <a href={LINKS.booking} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Termin buchen</a>
      </div>
    </main>
  );
}
