"use client";

import Link from "next/link";
import { useLang, CATEGORY_HE } from "@/lib/i18n";
import { categorySlug } from "@/lib/seo-content";
import { SITE } from "@/lib/site";

export default function SiteFooter({ categories, shortNames, repo }) {
  const { t, lang, href } = useLang();
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
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener me"
            className="focus-ring mt-6 inline-flex items-center gap-2.5 rounded-full border border-paper/30 py-2 pe-4 ps-2 text-sm transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>{f.instagram}</span>
            <span dir="ltr" className="font-mono text-[11px] opacity-60">{SITE.instagramHandle}</span>
          </a>
        </div>
        <nav aria-label={f.categories} className="col-span-6 md:col-span-3">
          <p className="mb-3 label text-paper/50">{f.categories}</p>
          <ul className="space-y-1.5 text-sm">
            {categories.map((c) => (
              <li key={c}>
                <Link href={href(`/designs/${categorySlug(c)}`)} className="hover:underline">
                  {lang === "he" ? CATEGORY_HE[c] || c : shortNames[c] || c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-6 md:col-span-3">
          <p className="mb-3 label text-paper/50">{f.studio}</p>
          <ul className="space-y-1.5 text-sm">
            <li><Link href={href("/services")} className="hover:underline">{f.services}</Link></li>
            <li><Link href={href("/guides")} className="hover:underline">{f.guides}</Link></li>
            <li><Link href={`${home}#custom`} className="hover:underline">{f.bookCustom}</Link></li>
            <li><a href="/sitemap.xml" className="hover:underline">{f.sitemap}</a></li>
            <li><a href={SITE.instagram} target="_blank" rel="noopener" className="hover:underline">Instagram</a></li>
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
