# Specimen Design · דוגמית עיצוב

Live: https://specimen-designs.vercel.app · Instagram: [@specimen.design](https://www.instagram.com/specimen.design/)

Full project brief (business, brand, architecture, open tasks): [`docs/PROJECT-BRIEF.md`](docs/PROJECT-BRIEF.md)

A specimen book of full website designs and hand-tuned animated React components that do not look generated. Each one has a **live preview**, a **copy-ready Claude prompt**, and its own SEO page at `/vault/[slug]`. English by default, Hebrew at `/he`.

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

- **Two real languages.** English pages live under `src/app/(en)`, Hebrew under `src/app/(he)/he` — each a separate root layout, so Hebrew is server-rendered as `<html lang="he" dir="rtl">` with Hebrew titles, descriptions, h1s and body copy (`src/data/he.json`).
- **hreflang** `en` / `he` / `x-default` on every page and in `sitemap.xml`; canonical URLs always point at `https://specimen-designs.vercel.app` in production.
- **Landing pages** for every category (`/designs/website-designs`, `/designs/hero-sections`, …) and design style (`/styles/neo-brutalist`, `/styles/bauhaus`, …) in both languages — copy in `src/lib/seo-content.js`.
- **JSON-LD:** `WebSite`, `Organization`, `CollectionPage`/`ItemList`, `FAQPage`, `ProfessionalService` on home; `SoftwareSourceCode` + `CreativeWork` + `BreadcrumbList` on items; `CollectionPage` + `BreadcrumbList` on landing pages.
- Crawlable FAQ (`<details>`), the full prompt text on each item page, internal links between every page.
- **Search Console:** set `GOOGLE_SITE_VERIFICATION` (and optionally `BING_SITE_VERIFICATION`) in Vercel → the verification meta tag is emitted; then submit `/sitemap.xml`.

## License

MIT — use the components anywhere.
