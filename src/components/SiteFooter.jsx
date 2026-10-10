"use client";

import Link from "next/link";
import { useLang, CATEGORY_HE } from "@/lib/i18n";

export default function SiteFooter({ categories, shortNames, repo }) {
  const { t, lang } = useLang();
  const f = t.footer;
  const home = lang === "he" ? "/he" : "/";
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-14 md:px-8">
        <div className="col-span-12 md:col-span-6">
          <p className="text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] rtl:tracking-[-0.01em]">
            {f.made[0]}
            <span className="font-serif font-normal italic text-terracotta rtl:not-italic">{f.made[1]}</span>
          </p>
          <p className="mt-4 text-sm text-paper/60">{f.tagline}</p>
        </div>
        <nav aria-label={f.categories} className="col-span-6 md:col-span-3">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">{f.categories}</p>
          <ul className="space-y-1.5 text-sm">
            {categories.map((c) => (
              <li key={c}>
                <Link href={`${home}#vault`} className="hover:underline">
                  {lang === "he" ? CATEGORY_HE[c] || c : shortNames[c] || c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-6 md:col-span-3">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">{f.studio}</p>
          <ul className="space-y-1.5 text-sm">
            <li><Link href={`${home}#custom`} className="hover:underline">{f.bookCustom}</Link></li>
            <li><a href="/sitemap.xml" className="hover:underline">{f.sitemap}</a></li>
            {repo && <li><a href={repo} className="hover:underline">{f.source}</a></li>}
          </ul>
        </div>
        <div className="col-span-12 flex flex-wrap justify-between gap-2 border-t border-paper/20 pt-4 font-mono text-[11px] text-paper/50">
          <span>{f.rights(year)}</span>
          <span>{f.daily}</span>
        </div>
      </div>
    </footer>
  );
}
