# Enterprise Vibe Coding Rules

> **Maintained by [MAKONIS GmbH](https://makonis.de)** – Spezialisten für Azure Landing Zones und [Enterprise Vibe Coding](https://makonis.de/ratgeber/enterprise-vibe-coding) in München.
>
> Benötigen Sie Unterstützung bei AI Governance, SaaS-Replacement oder Legacy Modernization? [30-Minuten KI-Architektur-Audit buchen](https://meet.makonis.de/team/ki-beratung) oder [Managed Vibe Coding im MAKONIS Sales Hub anfragen](https://hub.makonis.de).

[![License: MIT](https://img.shields.io/badge/License-MIT-F97316.svg)](https://opensource.org/license/mit/)
[![Tools: Cursor / Claude Code / Copilot](https://img.shields.io/badge/Tools-Cursor%20%2F%20Claude%20Code%20%2F%20Copilot-1C1917.svg)](#rule-sets--konfigurationsdateien)
[![OWASP Top 10 Aligned](https://img.shields.io/badge/OWASP%20Top%2010-Aligned-F97316.svg)](https://owasp.org/www-project-top-ten/)
[![DevSecOps Automated](https://img.shields.io/badge/DevSecOps-Automated-1C1917.svg)](#cicd-automated-gates)
[![ISO 27001 Baseline](https://img.shields.io/badge/ISO%2027001-Baseline-F97316.svg)](#security--secrets-prevention)

**Versionierte AI-Coding-Regeln für sichere, wartbare und produktionsnahe Enterprise-Anwendungen.** Das Open-Source-Projekt bündelt Governance-Vorgaben für Cursor, Claude Code und GitHub Copilot und stellt einen interaktiven Generator für projektspezifische Regeldateien bereit.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Schnellstart](#schnellstart)
- [Rule Sets & Konfigurationsdateien](#rule-sets--konfigurationsdateien)
- [Governance Pillars](#governance-pillars)
- [Live Rule Generator](#live-rule-generator)
- [Lokale Entwicklung](#lokale-entwicklung)
- [Projektstruktur](#projektstruktur)
- [Beitragen](#beitragen)
- [Enterprise Support & Sprints](#enterprise-support--sprints)
- [Lizenz](#lizenz)

## Überblick

**Enterprise Vibe Coding Rules ist ein Governance-Framework gegen Vibe Coding Debt bei produktionsnahen Enterprise-Anwendungen.** Es übersetzt Sicherheits-, Architektur- und Delivery-Vorgaben in konkrete Anweisungen, die AI-Coding-Tools direkt im Entwicklungskontext berücksichtigen können.

KI-gestützte Entwicklung beschleunigt die Umsetzung, kann ohne verbindliche Leitplanken jedoch zu unsicheren Standards, undurchsichtigen Abhängigkeiten, duplizierter Logik und schwer wartbaren Anwendungen führen. Dieses Repository macht die erwarteten Qualitäts- und Sicherheitsentscheidungen explizit, versionierbar und überprüfbar.

Das Framework verfolgt vier Ziele:

1. **Security by Default:** Secrets, Injections, unsichere Authentifizierung und riskante dynamische Code-Ausführung werden bereits im Prompt-Kontext adressiert.
2. **Architecture Guardrails:** Generierter Code muss zur bestehenden Zielarchitektur passen, modular bleiben und überprüfbare Geschäftslogik enthalten.
3. **Automated DevSecOps:** Linting, Typechecks, Tests, Secret Scanning, SAST und Software Composition Analysis sind verbindliche Merge-Gates.
4. **Controlled SaaS Replacement:** Eigene Anwendungen ersetzen SaaS-Produkte nur mit dokumentiertem Funktionsumfang, Migrationspfad, Betriebsverantwortung und nachvollziehbaren Kosten.

Die Regeln ergänzen menschliche Code-Reviews und automatisierte Prüfungen. Sie ersetzen weder Threat Modeling noch eine formale Zertifizierung oder ein vollständiges Security-Audit.

## Schnellstart

### Regeldatei mit dem Generator erstellen

1. Starten Sie die [interaktive Web-App lokal](#lokale-entwicklung) oder öffnen Sie ihre veröffentlichte Instanz.
2. Wählen Sie die benötigten Module aus Security, Architecture, DevSecOps und SaaS Replacement.
3. Wählen Sie **Cursor**, **Claude Code** oder **GitHub Copilot** als Zieltool.
4. Prüfen Sie die Vorschau, kopieren Sie den Inhalt oder laden Sie die Regeldatei herunter.
5. Speichern Sie die Datei am [jeweiligen Zielort](#rule-sets--konfigurationsdateien) in Ihrem Anwendungs-Repository.
6. Ergänzen Sie die verbindlichen CI-Gates und lassen Sie Änderungen durch einen Code Owner reviewen.

### Regeldatei manuell übernehmen

Die versionierten Ausgangsregeln liegen in [`src/lib/rules.ts`](src/lib/rules.ts). Übernehmen Sie die relevanten Module in die Konfigurationsdatei Ihres Tools und passen Sie projektspezifische Vorgaben kontrolliert an. Änderungen an den gemeinsamen Regeln sollten über einen Pull Request nachvollziehbar dokumentiert werden.

## Rule Sets & Konfigurationsdateien

Der Generator erzeugt aus denselben Regelmodulen eine werkzeugspezifische Konfiguration. Dadurch bleiben Security- und Governance-Vorgaben über verschiedene AI-Coding-Tools hinweg konsistent.

| AI-Coding-Tool | Zieldatei | Ablageort im Zielprojekt | Zweck |
| --- | --- | --- | --- |
| Cursor | `.cursorrules` | Repository-Root | Projektweite Verhaltens- und Qualitätsregeln für Cursor |
| Claude Code | `CLAUDE.md` | Repository-Root | Repository-Anweisungen für Claude Code |
| GitHub Copilot | `.github/copilot-instructions.md` | Verzeichnis `.github/` | Repository-weite Instructions für Copilot |

### `.cursorrules`

`.cursorrules` enthält die ausgewählten MAKONIS-Regelmodule als projektweite Vorgaben für Cursor. Die Datei wird im Repository-Root abgelegt und gemeinsam mit dem Anwendungscode versioniert.

Empfohlener Aufbau:

```markdown
# Projektname – AI Coding Rules (Cursor)

## OWASP Top 10 Security & Secrets Prevention

- Never hardcode secrets, API keys, tokens or connection strings.
- Always use parameterized queries or an ORM.
- Enforce authentication and authorization checks server-side on every endpoint.

## Architecture Guardrails gegen Vibe Coding Debt

- Follow the existing project structure and conventions.
- Every new feature ships with tests covering the business rules it introduces.
```

### `CLAUDE.md`

`CLAUDE.md` stellt Claude Code dieselben Governance-Vorgaben im Repository-Root bereit. Der Generator ergänzt eine kurze Einordnung, damit die Datei eindeutig als Anweisung für die Arbeit am jeweiligen Repository erkennbar ist.

```markdown
# CLAUDE.md – Projektname

Instructions for Claude Code when working in this repository.

## Enterprise DevSecOps CI-Gates

- All changes must pass lint, typecheck, unit tests and SAST before merge.
- AI-generated pull requests require human review by a code owner.
```

### `.github/copilot-instructions.md`

GitHub Copilot erhält die Regeln über `.github/copilot-instructions.md`. Der Generator zeigt den Dateinhalt in der Vorschau an und weist im Dokument ausdrücklich auf den korrekten Zielpfad hin.

```text
Ihr-Anwendungs-Repository/
└── .github/
    └── copilot-instructions.md
```

### Regelpflege und Single Source of Truth

- Gemeinsame Regelmodule werden zentral in `src/lib/rules.ts` gepflegt.
- Jedes Modul besitzt eine eindeutige ID, einen Titel, eine Kurzbeschreibung und konkrete Regeln.
- Die Generierung erfolgt ohne versteckte Remote-Abhängigkeiten und erzeugt kopier- beziehungsweise herunterladbaren Text.
- Neue oder veränderte Regeln benötigen nachvollziehbare Tests und ein menschliches Review.
- Projektspezifische Ergänzungen sollten bestehende Schutzregeln nicht stillschweigend abschwächen.

## Governance Pillars

### Security & Secrets Prevention

Dieses Modul orientiert sich an Risiken aus den [OWASP Top 10](https://owasp.org/www-project-top-ten/) und überträgt sie in unmittelbare Anweisungen für generierten Code.

**Zentrale Anforderungen:**

- Keine hartcodierten API-Keys, Tokens, Passwörter oder Connection Strings.
- Secrets werden über Umgebungsvariablen oder einen Secret Store wie Azure Key Vault bereitgestellt.
- SQL-, NoSQL- und Shell-Befehle werden nicht durch String-Konkatenation mit Nutzereingaben erzeugt.
- Externe Eingaben werden an Trust Boundaries per Schema validiert und bereinigt.
- Keine dynamische Code-Ausführung über `eval()` oder `new Function()` mit nicht vertrauenswürdigen Daten.
- Ausgaben werden standardmäßig escaped; kontrollierter Roh-HTML-Code darf keine nutzerkontrollierten Inhalte enthalten.
- Authentifizierung und Autorisierung werden serverseitig an jedem Endpoint durchgesetzt.
- Passwort-Hashes verwenden bewährte Verfahren wie Argon2id oder bcrypt; eigene Kryptografie ist untersagt.
- Logs enthalten keine Secrets, Tokens oder personenbezogenen Daten.

Die enthaltenen Vorgaben bilden eine **ISO-27001-Baseline** für den sicheren Entwicklungsprozess. Sie stellen keine ISO-27001-Zertifizierung dar und ersetzen kein Information Security Management System.

### Architecture & State Guardrails

Architecture & State Guardrails begrenzen Vibe Coding Debt, indem sie Struktur, Verantwortlichkeiten und Veränderbarkeit als verbindliche Entwurfsentscheidungen behandeln.

**Zentrale Anforderungen:**

- Bestehende Projektstruktur und Konventionen haben Vorrang vor neuen Frameworks oder Mustern.
- Architekturänderungen werden durch ein Architecture Decision Record (ADR) begründet.
- Funktionen bleiben unter 50 Zeilen und Dateien unter 400 Zeilen; größere Einheiten werden in Module zerlegt.
- Fachlogik wird von I/O wie HTTP, Datenbanken und UI getrennt und bleibt ohne Infrastruktur testbar.
- Zustand und Seiteneffekte werden an klaren Modulgrenzen geführt statt quer durch die Anwendung verteilt.
- Vor neuer Hilfslogik wird nach vorhandenen Implementierungen gesucht, um Duplikate zu vermeiden.
- Öffentliche Schnittstellen sind explizit typisiert; `any` in TypeScript ist nicht zulässig.
- Neue Features enthalten Tests für die eingeführten Geschäftsregeln.
- Kommentare erklären nicht offensichtliche Entscheidungen und deren Gründe.

### CI/CD Automated Gates

AI-generierte Änderungen durchlaufen dieselben oder strengeren Quality Gates wie manuell erstellte Änderungen. Ein erfolgreicher Merge setzt automatisierte Prüfungen und ein Human-in-the-Loop-Review voraus.

| Gate | Beispielwerkzeug | Mindestanforderung |
| --- | --- | --- |
| Secret Scanning | [Gitleaks](https://github.com/gitleaks/gitleaks) oder GitHub Secret Scanning | Bei jedem Push ausführen; ein Finding blockiert die Pipeline. |
| Static Application Security Testing | [Semgrep](https://semgrep.dev) oder CodeQL | Vor dem Merge ausführen; sicherheitsrelevante Findings müssen behoben werden. |
| Software Composition Analysis | [Trivy](https://trivy.dev) und Dependabot | Abhängigkeiten pinnen; keine neue Abhängigkeit mit bekanntem kritischem CVE. |
| Code Quality | Linter und Typechecker | Alle Prüfungen müssen ohne Deaktivierung oder Abschwächung bestehen. |
| Tests | Unit- und Integrationstests | Neue Geschäftsregeln benötigen prüfbare Testabdeckung. |
| Infrastructure Governance | Bicep oder Terraform mit Azure Policies | Infrastruktur ausschließlich per IaC ändern und gegen die Azure Landing Zone prüfen. |
| Human Review | Code Owner | Kein Auto-Merge für KI-generierte Pull Requests. |

Beispiel für lokale oder CI-basierte CLI-Prüfungen:

```bash
# Secrets im Git-Verlauf und Arbeitsstand prüfen
gitleaks git --redact .

# Statische Sicherheitsregeln ausführen und bei Findings fehlschlagen
semgrep scan --config auto --error .

# Dateisystem auf kritische und hoch kritische Schwachstellen prüfen
trivy fs --scanners vuln,secret --severity HIGH,CRITICAL --exit-code 1 .
```

Die konkrete Tool-Version und Konfiguration müssen im jeweiligen Projekt festgelegt und versioniert werden. CI-Checks, Tests oder Sicherheitsregeln dürfen nicht deaktiviert werden, nur damit ein Build erfolgreich wird.

### SaaS-Replacement Standards

SaaS Replacement ist kein reines Nachbauen vorhandener Oberflächen. Das Modul verlangt einen kontrollierten fachlichen, technischen und betrieblichen Ersatz.

**Zentrale Anforderungen:**

- Mit einem dokumentierten Feature-Inventar beginnen und nur tatsächlich genutzte Funktionen priorisieren.
- Export-, Import- und Migrationspfade für bestehende SaaS-Daten bereitstellen.
- Bewährte Managed Services wie Microsoft Entra ID, Azure SQL/PostgreSQL und Blob Storage statt unnötiger Eigenentwicklungen nutzen.
- Rollenbasierte Zugriffskontrolle und Audit Logging von Beginn an integrieren.
- Entwicklung, Test und Produktion über umgebungsspezifische Konfiguration unterstützen.
- Für jeden Service eine verantwortliche Person oder ein Team sowie Kostentags definieren.
- Betriebskosten, Datenhoheit, Exit-Strategie und langfristige Wartbarkeit als Entscheidungskriterien berücksichtigen.

## Live Rule Generator

Der **interaktive Live Rule Generator** ist als Web-App in diesem Repository enthalten und macht die Regelmodule ohne manuelle Zusammenstellung nutzbar. Die Anwendung kann lokal gestartet oder als öffentliche Instanz veröffentlicht werden.

**Funktionen:**

- Regelmodule einzeln auswählen und kombinieren.
- Projektnamen und Zieltool festlegen.
- Regeldateien für Cursor, Claude Code und GitHub Copilot live erzeugen.
- Ergebnis kopieren oder als Datei herunterladen.
- Eigene Codeausschnitte gegen ausgewählte Heuristiken testen.
- Die zugrunde liegenden Prinzipien in der [Governance-Dokumentation](#governance-pillars) nachlesen.

Der Live-Test erkennt ausgewählte Muster wie hartcodierte Secrets, `eval()`, riskante SQL-String-Konkatenation, unkontrollierte HTML-Ausgaben, `any` und deaktivierte Checks. **Die Heuristik ist eine frühe Feedback-Hilfe und kein Ersatz für Gitleaks, Semgrep, Trivy, vollständige Tests oder ein Security-Review.**

## Lokale Entwicklung

### Voraussetzungen

- Node.js in einer aktuellen LTS-Version
- [Bun](https://bun.sh) als Paketmanager und Laufzeit für die Projektwerkzeuge
- Git

### Installation und Start

```bash
git clone https://github.com/makonis/enterprise-vibe-coding-rules.git
cd enterprise-vibe-coding-rules
bun install
bun run dev
```

### Qualitätsprüfungen

```bash
# Tests ausführen
bun run test

# Produktions-Build prüfen
bun run build

# Linting ausführen
bun run lint
```

Die Anwendung basiert auf TanStack Start, React, TypeScript, Vite und Tailwind CSS. Regelgenerierung und Musterprüfung sind als reine TypeScript-Funktionen implementiert und durch Tests abgesichert.

## Projektstruktur

```text
enterprise-vibe-coding-rules/
├── src/
│   ├── components/
│   │   └── generator.tsx        # Auswahl, Vorschau, Download und Live-Test
│   ├── lib/
│   │   ├── links.ts             # Zentrale externe Links
│   │   └── rules.ts             # Regelmodule, Generator und Heuristiken
│   ├── routes/
│   │   ├── index.tsx            # Interaktiver Rule Generator
│   │   └── governance.tsx       # Governance-Dokumentation
│   └── test/
│       └── rules.test.ts        # Tests für Regeln und Prüflogik
├── public/                      # Statische Assets
├── package.json                 # Scripts und Abhängigkeiten
└── README.md                    # Projekt- und Governance-Dokumentation
```

## Beitragen

Beiträge zu Regelmodulen, Prüfungen, Dokumentation und Tool-Unterstützung sind willkommen.

1. Forken Sie das Repository und erstellen Sie einen Branch.
2. Ändern Sie gemeinsame Regeln ausschließlich nachvollziehbar und mit klarer Begründung.
3. Ergänzen oder aktualisieren Sie Tests für jede neue Geschäfts- oder Prüfregel.
4. Führen Sie Tests, Linting und Build lokal aus.
5. Fügen Sie keine Secrets, personenbezogenen Daten oder vertraulichen Kundeninformationen hinzu.
6. Eröffnen Sie einen Pull Request und beschreiben Sie Verhalten, Risiken und Prüfumfang.

Mit einem Beitrag stimmen Sie zu, dass dieser unter der MIT-Lizenz des Projekts veröffentlicht wird.

## Enterprise Support & Sprints

Die [MAKONIS GmbH](https://makonis.de) unterstützt Unternehmen bei der Einführung sicherer AI-Coding-Prozesse, der Modernisierung bestehender Anwendungen und dem kontrollierten Ersatz von SaaS-Produkten.

- **[Enterprise Vibe Coding](https://makonis.de/ratgeber/enterprise-vibe-coding):** Governance, Architektur-Leitplanken und DevSecOps für produktive KI-Entwicklung.
- **[MAKONIS Sales Hub](https://hub.makonis.de):** Managed Vibe Coding und SaaS Replacement Sprints anfragen.
- **[30-Minuten KI-Architektur-Audit](https://meet.makonis.de/team/ki-beratung):** Ausgangslage, Risiken und einen geeigneten Einführungsweg mit MAKONIS besprechen.

Typische Einsatzfelder sind AI Governance, SaaS Replacement, Legacy Modernization, Azure Landing Zones und die Industrialisierung bestehender Vibe-Coding-Initiativen.

## Lizenz

Dieses Projekt steht unter der [MIT License](https://opensource.org/license/mit/).

---

**Repository:** [makonis/enterprise-vibe-coding-rules](https://github.com/makonis/enterprise-vibe-coding-rules) · **Maintainer:** [MAKONIS GmbH](https://makonis.de), München
