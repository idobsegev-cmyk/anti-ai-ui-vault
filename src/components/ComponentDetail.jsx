"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import DetailTabs from "./DetailTabs";
import LivePreview from "./LivePreview";
import { useLang } from "@/lib/i18n";
import { shortCategory } from "@/lib/data";

/** The body of a component page, shared by the Next.js route and the single-file artifact. */
export default function ComponentDetail({ item, prev, next, related }) {
  const { t, lang, cat, sty } = useLang();
  const d = t.detail;
  const home = lang === "he" ? "/he" : "/";
  const catShort = lang === "he" ? cat(item.category) : shortCategory(item.category);

  return (
    <article className="pt-24 md:pt-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-b border-ink pb-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link href={`${home}#vault`} className="focus-ring inline-flex items-center gap-1 hover:underline">
            <ArrowLeft size={12} strokeWidth={2} className="rtl:-scale-x-100" /> {d.vault}
          </Link>
          <span className="text-ink-3">/</span>
          <span className="text-ink-3">{catShort}</span>
          <span className="ms-auto text-ink-3">{item.id}</span>
        </nav>

        <header className="grid grid-cols-12 gap-6 py-10 md:py-14">
          <div className="col-span-12 min-w-0 lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt">
              {cat(item.category)} · {sty(item.style || "Warm Editorial")}
            </p>
            <h1 lang="en" dir="ltr" className="mt-2 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-wrap:balance] rtl:text-right">
              {item.title}
            </h1>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-4 lg:col-span-4">
            <p lang="en" className="text-lg leading-snug text-ink-2">{item.description}</p>
            <ul className="flex flex-wrap gap-1.5" aria-label={d.tags}>
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-ink px-2.5 py-0.5 font-mono text-[11px]">{tag}</li>
              ))}
            </ul>
          </div>
        </header>

        <DetailTabs item={item} />

        <section className="grid grid-cols-12 gap-6 py-12" aria-labelledby="use-title">
          <h2 id="use-title" className="col-span-12 text-2xl font-semibold tracking-[-0.03em] md:col-span-4">
            {d.howTitle[0]}
            <span className="font-serif font-normal italic rtl:not-italic">{d.howTitle[1]}</span>
          </h2>
          <ol className="col-span-12 grid gap-4 text-sm leading-relaxed text-ink-2 sm:grid-cols-3 md:col-span-8">
            {d.how.map(([h, body]) => (
              <li key={h} className="border-t border-ink pt-3">
                <b className="block text-ink">{h}</b>
                {body}
              </li>
            ))}
          </ol>
        </section>

        {related.length > 0 && (
          <section className="border-t border-ink py-12" aria-labelledby="related-title">
            <h2 id="related-title" className="mb-6 text-2xl font-semibold tracking-[-0.03em]">{d.more(catShort)}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/vault/${r.slug}`} className="focus-ring group overflow-hidden rounded-2xl border border-ink">
                  <LivePreview code={r.previewCode} id={`rel-${r.slug}`} className="pointer-events-none w-full border-b border-ink" />
                  <div className="flex items-center justify-between gap-3 p-4">
                    <span lang="en" className="font-semibold tracking-tight">{r.title}</span>
                    <ArrowUpRight size={16} strokeWidth={1.75} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav aria-label="Pagination" className="grid grid-cols-2 border-t border-ink">
          <Link href={`/vault/${prev.slug}`} className="focus-ring group min-w-0 border-e border-ink py-8 pe-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">{d.prev}</span>
            <span lang="en" className="mt-1 block text-lg font-semibold tracking-tight group-hover:underline">{prev.title}</span>
          </Link>
          <Link href={`/vault/${next.slug}`} className="focus-ring group min-w-0 py-8 ps-4 text-end">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">{d.next}</span>
            <span lang="en" className="mt-1 block text-lg font-semibold tracking-tight group-hover:underline">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
