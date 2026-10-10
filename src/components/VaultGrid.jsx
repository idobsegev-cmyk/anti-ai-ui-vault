"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import LivePreview from "./LivePreview";
import SitePreview from "./SitePreview";
import { WEBSITE, localize } from "@/lib/data";
import CopyButton from "./CopyButton";
import { useLang, CATEGORY_HE } from "@/lib/i18n";

// Bento rhythm: which positions in the list become wide cards on large screens.
const WIDE = new Set([0, 5, 9, 14, 18, 23, 27, 32]);

export function VaultCard({ item, index, wide }) {
  const { t, cat, sty, tags, lang, href } = useLang();
  const L = localize(item, lang);
  return (
    <motion.article
      layout
      data-touch-scroll
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink bg-paper ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className="relative border-b border-ink">
        {item.category === WEBSITE ? (
          <SitePreview code={item.previewCode} id={`card-${item.slug}`} className="w-full" />
        ) : (
          <LivePreview code={item.previewCode} id={`card-${item.slug}`} className="w-full" designWidth={wide ? 820 : 520} designHeight={wide ? 400 : 390} />
        )}
      </div>
      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              <span className="inline-flex items-center gap-1 text-cobalt">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cobalt" /> {t.vault.live}
              </span>
              {cat(item.category)}
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-tight tracking-[-0.02em]">
              <Link href={href(`/vault/${item.slug}`)} className="focus-ring after:absolute after:inset-0 after:content-['']">
                {L.title}
              </Link>
            </h3>
          </div>
          <motion.span
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-paper"
            whileHover={{ rotate: 45 }}
          >
            <ArrowUpRight size={15} strokeWidth={1.75} className="rtl:-scale-x-100" />
          </motion.span>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-ink-2">{L.description}</p>
        <span className="w-fit rounded-full border border-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">{t.vault.style} · {sty(item.style || "Warm Editorial")}</span>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <ul className="flex flex-wrap gap-1">
            {tags(item.tags).slice(0, 3).map((t) => (
              <li key={t} className="rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[10px] text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <CopyButton text={item.claudePrompt} size="sm" toastSub={L.title} className="relative z-10" />
        </div>
      </div>
    </motion.article>
  );
}

export default function VaultGrid({ items, categories, shortNames }) {
  const { t, sty, lang } = useLang();
  const [cat, setCat] = useState("All");
  const [style, setStyle] = useState("All styles");
  const [q, setQ] = useState("");

  const styles = useMemo(() => {
    const counts = {};
    for (const it of items) counts[it.style || "Warm Editorial"] = (counts[it.style || "Warm Editorial"] || 0) + 1;
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  // Interleave design languages so the grid never opens on a wall of one look.
  const ordered = useMemo(() => {
    const groups = {};
    for (const it of items) (groups[it.style || "Warm Editorial"] ||= []).push(it);
    const queues = Object.values(groups).sort((a, b) => b.length - a.length);
    const warm = groups["Warm Editorial"] || [];
    const others = items.filter((it) => (it.style || "Warm Editorial") !== "Warm Editorial");
    const out = [];
    let w = 0, o = 0;
    while (w < warm.length || o < others.length) {
      if (o < others.length) out.push(others[o++]);
      if (w < warm.length) out.push(warm[w++]);
    }
    return queues.length ? out : items;
  }, [items]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ordered.filter((it) => {
      if (cat !== "All" && it.category !== cat) return false;
      if (style !== "All styles" && (it.style || "Warm Editorial") !== style) return false;
      if (!needle) return true;
      const h = localize(it, "he");
      return (it.title + " " + it.description + " " + h.title + " " + h.description + " " + it.tags.join(" ") + " " + (it.style || "")).toLowerCase().includes(needle);
    });
  }, [ordered, cat, style, q]);

  const chips = ["All", ...categories];
  const sites = filtered.filter((it) => it.category === WEBSITE);
  const parts = filtered.filter((it) => it.category !== WEBSITE);

  return (
    <section id="vault" className="scroll-mt-20 border-b border-ink" aria-labelledby="vault-title">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-ink pb-6">
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">{t.vault.kicker(items.length)}</p>
            <h2 id="vault-title" className="mt-2 text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              {t.vault.title[0]}<span className="font-serif font-normal italic rtl:not-italic">{t.vault.title[1]}</span>{t.vault.title[2]}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <label className="relative flex items-center">
              <span className="sr-only">{t.vault.searchLabel}</span>
              <Search size={16} strokeWidth={1.75} className="pointer-events-none absolute start-4 text-ink-3" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.vault.search}
                className="focus-ring w-full rounded-full border border-ink bg-paper py-3 ps-11 pe-10 text-sm placeholder:text-ink-3"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label={t.vault.clear} className="focus-ring absolute end-3 rounded-full p-1 hover:bg-paper-2">
                  <X size={14} />
                </button>
              )}
            </label>
          </div>
        </div>

        <LayoutGroup id="vault-filter">
          <div role="tablist" aria-label={t.vault.filter} className="-mx-1 flex gap-1 overflow-x-auto py-5">
            {chips.map((c) => {
              const on = c === cat;
              const n = c === "All" ? items.length : items.filter((i) => i.category === c).length;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCat(c)}
                  className="focus-ring relative shrink-0 rounded-full border border-ink px-3.5 py-1.5 text-sm"
                >
                  {on && <motion.span layoutId="cat-pill" transition={{ type: "spring", stiffness: 500, damping: 36 }} className="absolute -inset-px rounded-full bg-ink" />}
                  <span className={`relative flex items-center gap-1.5 ${on ? "text-paper" : ""}`}>
                    {c === "All" ? t.vault.all : lang === "he" ? CATEGORY_HE[c] || c : shortNames[c] || c}
                    <span className={`font-mono text-[10px] ${on ? "text-paper/60" : "text-ink-3"}`}>{n}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="-mt-2 mb-5 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{t.vault.language}</span>
          {[["All styles", items.length], ...styles].map(([sname, n]) => (
            <button
              key={sname}
              onClick={() => setStyle(sname)}
              aria-pressed={style === sname}
              className={`focus-ring rounded-full border px-2.5 py-1 text-xs transition-colors ${style === sname ? "border-cobalt bg-cobalt text-paper" : "border-ink/30 hover:border-ink"}`}
            >
              {sname === "All styles" ? t.vault.allStyles : sty(sname)} <span className="font-mono text-[10px] opacity-60">{n}</span>
            </button>
          ))}
        </div>

        {sites.length > 0 && (
          <div className="mb-14">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-ink pb-3">
              <h3 className="text-3xl font-semibold tracking-[-0.03em]">{t.vault.websites[0]} <span className="font-mono text-sm text-ink-3">{t.vault.sites(sites.length)}</span></h3>
              <p className="text-sm text-ink-2">{t.vault.websites[1]}</p>
            </div>
            <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {sites.map((item, i) => (
                  <VaultCard key={item.slug} item={item} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {parts.length > 0 && (
          <>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-ink pb-3">
              <h3 className="text-3xl font-semibold tracking-[-0.03em]">{t.vault.components[0]} <span className="font-mono text-sm text-ink-3">{parts.length}</span></h3>
              <p className="text-sm text-ink-2">{t.vault.components[1]}</p>
            </div>
            <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {parts.map((item, i) => (
                  <VaultCard key={item.slug} item={item} index={i} wide={cat === "All" && style === "All styles" && !q && WIDE.has(i)} />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
        {filtered.length === 0 && (
          <p className="py-16 text-center font-serif text-2xl italic text-ink-3">{t.vault.empty(q)}</p>
        )}
      </div>
    </section>
  );
}
