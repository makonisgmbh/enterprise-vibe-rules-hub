import { createFileRoute } from "@tanstack/react-router";
import { Generator } from "@/components/generator";
import { RepoBanner } from "@/components/repo-banner";
import { LINKS } from "@/lib/links";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enterprise Vibe Coding Rules Hub – MAKONIS" },
      { name: "description", content: "Regeldateien für Cursor, Claude Code und GitHub Copilot live zusammenstellen – nach MAKONIS-Standards." },
      { property: "og:title", content: "Enterprise Vibe Coding Rules Hub" },
      { property: "og:description", content: "Interaktiver Regel-Generator für sicheres Enterprise Vibe Coding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="space-y-16 pb-8">
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Enterprise Vibe Coding Rules Hub</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          KI-Code mit Leitplanken.<br /><span className="text-primary">Regeln, die in Produktion halten.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Stellen Sie Ihre <span className="font-mono">.cursorrules</span>, <span className="font-mono">CLAUDE.md</span> oder Copilot-Instructions aus geprüften Modulen zusammen – testen, kopieren, fertig.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#generator" className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">Regeldatei erstellen</a>
          <a href={LINKS.hub} target="_blank" rel="noreferrer" className="rounded-md border border-foreground/20 px-5 py-3 font-semibold hover:bg-muted">Managed Vibe Coding</a>
        </div>
      </section>
      <RepoBanner />
      <Generator />
    </main>
  );
}
