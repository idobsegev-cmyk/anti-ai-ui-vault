# Specimen Design (דוגמית עיצוב)

Read `docs/PROJECT-BRIEF.md` first: business, brand, site map, architecture, automation, open tasks.

Live: https://specimen-designs.vercel.app (Hebrew: /he) · Instagram: https://www.instagram.com/specimen.design/ · Vercel team `segev1`, project `anti-ai-ui-vault` (auto-deploys `main`).

Rules that keep breaking if forgotten:
- Every UI string goes into both `STRINGS.en` and `STRINGS.he` (`src/lib/i18n.js`); every new item in `src/data/prompts.json` needs a Hebrew title/description in `src/data/he.json`.
- Hebrew copy is natural, concise and gender-neutral (present plural / infinitive, or slash forms). "Zine" = פנזין.
- Hebrew typography rules live in `src/app/globals.css` under `[lang="he"]`: no tracking, uppercase or italics on Hebrew text.
- `previewCode`: no imports/exports, no backticks, ends with `render(<Demo />)`, never moves the page (no autoFocus / scrollIntoView / window.scrollTo).
- Before pushing: `npm run check:previews && npm run build && npm run build:artifact`; verify in a real browser; check the live site ~2 min after push.
- `git pull` first — a daily bot (`vault-bot`) commits to `main` at 09:00 UTC.
