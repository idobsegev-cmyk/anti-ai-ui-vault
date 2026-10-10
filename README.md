# Anti-AI UI Vault · מבצר העיצוב

A vault of hand-tuned, animated React components that don't look generated. Each one has a **live preview**, a **copy-ready Claude prompt**, and its own SEO page at `/vault/[slug]`. New components are added automatically every morning for a week.

Warm paper `#FAF9F6`, charcoal `#121212`, one human accent (cobalt `#1D4ED8` or terracotta `#D9534F`). Swiss type, real springs. No neon, no glassmorphism.

## Stack

Next.js 16 (App Router) · Tailwind CSS v4 · Framer Motion · GSAP (SplitText hero) · Lucide · react-live (in-browser previews)

## Run locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run check:previews # compile + server-render every snippet
npm run build
```

## Publish (GitHub + Vercel)

```bash
gh auth login && vercel login   # one-time
bash scripts/ship.sh            # creates public repo "anti-ai-ui-vault", pushes, links Git, deploys to production
```

The script prints the GitHub and live Vercel URLs. After that, every push to `main` redeploys automatically.

## Daily content routine

`.github/workflows/daily-vault-update.yml` runs at 09:00 UTC:

1. `scripts/generate-daily-components.mjs` adds 3–5 components (one per category, least-filled categories first).
2. Every candidate is compiled and server-rendered; anything broken is rejected.
3. The site is built as a gate, then the bot commits `feat(vault): add daily animated components` to `main`.
4. Vercel's Git integration redeploys (or set a `VERCEL_DEPLOY_HOOK` secret).

**Engines**
- *Offline (default):* 8 component families × 12 business verticals → 96 distinct working components.
- *Claude (optional):* add an `ANTHROPIC_API_KEY` repo secret and the job asks Claude for brand-new designs first, falling back to offline for anything that fails validation. Override the model with a `CLAUDE_MODEL` repo variable.

The campaign window lives in `scripts/daily-config.json` (default: 2026-10-11 → 2026-10-17). Widen `endDate` to keep it going. Run it on demand: **Actions → Daily Vault Update → Run workflow** (tick *force*).

## Lead form

`POST /api/lead` validates, drops honeypot spam, and forwards JSON to `LEAD_WEBHOOK_URL` (Zapier, Make, Slack, Formspree, your CRM). Without it, leads are written to the Vercel function log.

## Data shape (`src/data/prompts.json`)

```json
{ "id": "vault-001", "slug": "…", "title": "…", "category": "…", "description": "…",
  "tags": ["Framer Motion", "…"], "claudePrompt": "…", "previewCode": "function Demo() {…} render(<Demo />);",
  "addedAt": "2026-10-10" }
```

`previewCode` runs in react-live with the globals in `src/lib/live-scope.js` — no imports, no backticks, ends with `render(<Demo />)`. The seed lives in `scripts/seed/*.mjs`; rebuild it with `npm run seed`.

## SEO

Per-page titles, descriptions, canonical URLs and generated OpenGraph images; `sitemap.xml` and `robots.txt`; JSON-LD `WebSite`, `ItemList`, `ProfessionalService` on the home page and `SoftwareSourceCode` + `CreativeWork` + `BreadcrumbList` on every component page.

## License

MIT — use the components anywhere.
