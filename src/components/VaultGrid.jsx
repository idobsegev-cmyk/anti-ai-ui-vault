"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import LivePreview from "./LivePreview";
import CopyButton from "./CopyButton";

// Bento rhythm: which positions in the list become wide cards on large screens.
const WIDE = new Set([0, 5, 9, 14, 18, 23, 27, 32]);

function VaultCard({ item, index, wide }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink bg-paper ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className="relative border-b border-ink">
        <LivePreview code={item.previewCode} id={`card-${item.slug}`} className="w-full" designWidth={wide ? 820 : 520} designHeight={wide ? 400 : 390} />
      </div>
      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              <span className="inline-flex items-center gap-1 text-cobalt">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cobalt" /> Live
              </span>
              {String(index + 1).padStart(2, "0")} — {item.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-tight tracking-[-0.02em]">
              <Link href={`/vault/${item.slug}`} className="focus-ring after:absolute after:inset-0 after:content-['']">
                {item.title}
              </Link>
            </h3>
          </div>
          <motion.span
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-paper"
            whileHover={{ rotate: 45 }}
          >
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </motion.span>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-ink-2">{item.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <ul className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((t) => (
              <li key={t} className="rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[10px] text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <CopyButton text={item.claudePrompt} size="sm" toastSub={item.title} className="relative z-10" />
        </div>
      </div>
    </motion.article>
  );
}

export default function VaultGrid({ items, categories, shortNames }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((it) => {
      if (cat !== "All" && it.category !== cat) return false;
      if (!needle) return true;
      return (it.title + " " + it.description + " " + it.tags.join(" ")).toLowerCase().includes(needle);
    });
  }, [items, cat, q]);

  const chips = ["All", ...categories];

  return (
    <section id="vault" className="scroll-mt-20 border-b border-ink" aria-labelledby="vault-title">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-ink pb-6">
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">The Vault — {items.length} components</p>
            <h2 id="vault-title" className="mt-2 text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              Touch everything. <span className="font-serif font-normal italic">Copy</span> what you love.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <label className="relative flex items-center">
              <span className="sr-only">Search components</span>
              <Search size={16} strokeWidth={1.75} className="pointer-events-none absolute left-4 text-ink-3" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search: magnetic, drag, accordion…"
                className="focus-ring w-full rounded-full border border-ink bg-paper py-3 pl-11 pr-10 text-sm placeholder:text-ink-3"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear search" className="focus-ring absolute right-3 rounded-full p-1 hover:bg-paper-2">
                  <X size={14} />
                </button>
              )}
            </label>
          </div>
        </div>

        <LayoutGroup id="vault-filter">
          <div role="tablist" aria-label="Filter by category" className="-mx-1 flex gap-1 overflow-x-auto py-5">
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
                    {c === "All" ? "All" : shortNames[c] || c}
                    <span className={`font-mono text-[10px] ${on ? "text-paper/60" : "text-ink-3"}`}>{n}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <VaultCard key={item.slug} item={item} index={i} wide={cat === "All" && !q && WIDE.has(i)} />
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="py-16 text-center font-serif text-2xl italic text-ink-3">Nothing matches “{q}”. Try “drag” or “spring”.</p>
        )}
      </div>
    </section>
  );
}
