import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { LINKS } from "@/lib/links";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="text-lg">MAKONIS</span>
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">Vibe Coding Rules Hub</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Generator</Link>
          <Link to="/governance" activeProps={{ className: "text-primary" }}>Governance</Link>
          <a href={LINKS.repo} target="_blank" rel="noreferrer" className="hidden items-center gap-1 sm:flex"><Github className="h-4 w-4" />GitHub</a>
          <a href={LINKS.booking} target="_blank" rel="noreferrer" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover">Termin buchen</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold">Vibe Coding sicher in Produktion bringen.</h2>
          <p className="mt-3 max-w-xl text-secondary-foreground/70">
            Managed Vibe Coding und SaaS Replacement Sprints – mit Governance, CI-Gates und Azure Landing Zone von Anfang an.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={LINKS.booking} target="_blank" rel="noreferrer" className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">Erstgespräch buchen</a>
            <a href={LINKS.hub} target="_blank" rel="noreferrer" className="rounded-md border border-secondary-foreground/30 px-5 py-3 font-semibold hover:bg-secondary-foreground/10">Zum Sales Hub</a>
          </div>
        </div>
        <div className="text-sm text-secondary-foreground/70">
          <p className="font-semibold text-secondary-foreground">MAKONIS GmbH</p>
          <p>München</p>
          <p className="mt-3">Azure Landing Zones · Enterprise Vibe Coding</p>
          <a href={LINKS.repo} className="mt-3 inline-block underline" target="_blank" rel="noreferrer">makonisgmbh/enterprise-vibe-rules-hub</a>
        </div>
      </div>
    </footer>
  );
}
