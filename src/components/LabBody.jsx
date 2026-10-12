"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VaultCard } from "./VaultGrid";
import { useLang, CATEGORY_HE } from "@/lib/i18n";
import { categorySlug } from "@/lib/seo-content";

/** The components lab: every single-piece item, grouped by category. `groups` is [[category, items], ...]. */
export default function LabBody({ groups, shortNames }) {
  const { t, lang, href } = useLang();
  const L = t.lab;
  const total = groups.reduce((n, [, list]) => n + list.length, 0);
  const name = (c) => (lang === "he" ? CATEGORY_HE[c] || c : shortNames[c] || c);
  const home = lang === "he" ? "/he" : "/";

  return (
    <section className="pt-24 md:pt-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-b border-ink pb-2 label">
          <Link href={home} className="focus-ring hover:underline">{t.brand}</Link>
          <span className="text-ink-3">/</span>
          <span className="text-ink-3">{t.nav.lab}</span>
          <span className="ms-auto text-ink-3">{L.count(total)}</span>
        </nav>

        <header className="grid grid-cols-12 gap-6 py-10 md:py-14">
          <div className="col-span-12 lg:col-span-7">
            <p className="label text-cobalt">{L.kicker(total)}</p>
            <h1 className="mt-2 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-wrap:balance] rtl:leading-[1.1] rtl:tracking-normal">
              {L.title[0]}<span className="font-serif font-normal italic rtl:not-italic">{L.title[1]}</span>{L.title[2]}
            </h1>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-4 lg:col-span-5">
            <p className="text-lg leading-snug text-ink-2">{L.intro}</p>
            <Link href={`${home}#vault`} className="focus-ring group inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline decoration-ink/25 underline-offset-[5px] hover:decoration-ink">
              {L.toSites} <ArrowUpRight size={14} strokeWidth={1.75} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </header>

        <nav aria-label={L.jump} className="-mx-1 mb-10 flex flex-wrap gap-1.5 border-t border-ink pt-5">
          {groups.map(([c, list]) => (
            <a key={c} href={`#${categorySlug(c)}`} className="focus-ring rounded-full border border-ink/30 px-3 py-1 text-sm transition-colors hover:border-ink">
              {name(c)} <span className="font-mono text-[10px] text-ink-3">{list.length}</span>
            </a>
          ))}
        </nav>

        {groups.map(([c, list]) => (
          <div key={c} id={categorySlug(c)} className="mb-14 scroll-mt-24">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-ink pb-3">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] rtl:tracking-normal">
                {name(c)} <span className="font-mono text-sm text-ink-3">{list.length}</span>
              </h2>
              <Link href={href(`/designs/${categorySlug(c)}`)} className="focus-ring text-sm text-ink-2 underline underline-offset-4 hover:text-ink">
                {L.seeAll}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((it, i) => <VaultCard key={it.slug} item={it} index={i} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
