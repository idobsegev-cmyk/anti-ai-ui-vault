import Link from "next/link";
import { CATEGORY_PAGES, STYLE_PAGES } from "@/lib/seo-content";
import { WEBSITE, getSites } from "@/lib/data";
import { SERVICE_HUB, SERVICE_PAGES } from "@/lib/services-content";
import { GUIDES, GUIDE_HUB } from "@/lib/guides-content";

/** Crawlable links to every category and design-language page, in the page's language. */
export default function Explore({ lang, current }) {
  const he = lang === "he";
  // Style chips lead with the full-site catalogue: only languages that have a site are advertised here.
  const siteStyles = new Set(getSites().map((i) => i.style || "Warm Editorial"));
  const hasSite = (k) => siteStyles.has(k);
  const p = (x) => (he ? `/he${x}` : x);
  const chip = (active) =>
    `focus-ring rounded-full border px-3.5 py-1.5 text-sm transition-colors ${active ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"}`;
  return (
    <section className="border-b border-ink bg-paper-2" aria-labelledby="explore-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-14 md:px-8">
        <h2 id="explore-title" className="col-span-12 text-2xl font-semibold tracking-[-0.03em] md:col-span-3">
          {he ? "לפי סוג ולפי סגנון" : "Browse by type and style"}
        </h2>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <nav aria-label={he ? "סוגי עיצובים" : "Design types"} className="flex flex-wrap gap-2">
            {CATEGORY_PAGES.filter((c) => c.key === WEBSITE).map((c) => (
              <Link key={c.slug} href={p(`/designs/${c.slug}`)} className={chip(current === c.slug)}>
                {c[lang].h1}
              </Link>
            ))}
            <Link href={p("/components")} className={`${chip(current === "components")} text-ink-3`}>
              {he ? "מעבדת רכיבים" : "Components lab"}
            </Link>
          </nav>
          <nav aria-label={he ? "שפות עיצוב" : "Design languages"} className="flex flex-wrap gap-2">
            {STYLE_PAGES.filter((s) => s.slug === current || hasSite(s.key)).map((s) => (
              <Link key={s.slug} href={p(`/styles/${s.slug}`)} className={chip(current === s.slug)}>
                {s[lang].h1}
              </Link>
            ))}
          </nav>
          <nav aria-label={GUIDE_HUB[lang].h1} className="flex flex-wrap gap-2 border-t border-ink/20 pt-6">
            <Link href={p("/guides")} className={chip(current === "guides")}>{GUIDE_HUB[lang].h1}</Link>
            {GUIDES.map((g) => (
              <Link key={g.slug} href={p(`/guides/${g.slug}`)} className={chip(current === g.slug)}>
                {g[lang].short}
              </Link>
            ))}
          </nav>
          <nav aria-label={SERVICE_HUB[lang].industriesTitle} className="flex flex-wrap gap-2 border-t border-ink/20 pt-6">
            <Link href={p("/services")} className={chip(current === "services")}>{SERVICE_HUB[lang].h1}</Link>
            {SERVICE_PAGES.map((s) => (
              <Link key={s.slug} href={p(`/services/${s.slug}`)} className={chip(current === s.slug)}>
                {s[lang].h1}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
