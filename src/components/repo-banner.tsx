import { Github, Star } from "lucide-react";
import { LINKS } from "@/lib/links";

export function RepoBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-6 rounded-xl bg-secondary p-8 text-secondary-foreground md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary"><Github className="h-4 w-4" />Open Source</div>
          <p className="mt-2 font-mono text-xl font-medium">makonis/enterprise-vibe-coding-rules</p>
          <blockquote className="mt-4 border-l-4 border-primary pl-4 text-secondary-foreground/80">
            „Maintained by MAKONIS GmbH – Spezialisten für Azure Landing Zones und Enterprise Vibe Coding in München“
          </blockquote>
        </div>
        <a href={LINKS.repo} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">
          <Star className="h-4 w-4" />Auf GitHub ansehen
        </a>
      </div>
    </section>
  );
}
