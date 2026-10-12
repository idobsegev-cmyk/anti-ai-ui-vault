"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Search, X } from "lucide-react";
import LivePreview from "./LivePreview";
import SitePreview from "./SitePreview";
import { WEBSITE, CARD_FOCUS, localize } from "@/lib/data";
import CopyButton from "./CopyButton";
import WindowFrame from "./WindowFrame";
import { seeded } from "@/lib/palette";
import { useLang } from "@/lib/i18n";

export function VaultCard({ item, index, wide }) {
  const { cat, sty, lang, href } = useLang();
  const L = localize(item, lang);
  return (
    <motion.article
      layout
      data-touch-scroll
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink bg-paper transition-[box-shadow,translate] duration-200 ease-[var(--ease-out)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-ink)] rtl:hover:translate-x-0.5 rtl:hover:shadow-[-5px_5px_0_0_var(--color-ink)] ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className="relative border-b border-ink">
        {item.category === WEBSITE ? (
          <SitePreview code={item.previewCode} id={`card-${item.slug}`} className="w-full" focus={CARD_FOCUS[item.slug] || 0} />
        ) : (
          <LivePreview code={item.previewCode} id={`card-${item.slug}`} className="w-full" designWidth={wide ? 820 : 520} designHeight={wide ? 400 : 390} />
        )}
      </div>
      <div className="relative flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em]">
            <Link href={href(`/vault/${item.slug}`)} className="focus-ring after:absolute after:inset-0 after:content-['']">
              {L.title}
            </Link>
          </h3>
          <span className="label shrink-0 text-ink-3">{sty(item.style || "Warm Editorial")}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-ink-2">{L.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="label text-ink-3">{cat(item.category)}</span>
          <CopyButton text={item.claudePrompt} size="sm" toastSub={L.title} className="relative z-10" />
        </div>
      </div>
    </motion.article>
  );
}

const ASPECTS = ["4 / 3", "4 / 5", "16 / 10", "4 / 3", "1 / 1"];
const LIVES = ["win-bob", "win-sway", "win-drift", "win-bob"];
const PLATES = ["ink", "cobalt", "terracotta", "ink", "moss"];
const STICKERS = ["bg-terracotta text-paper", "bg-cobalt text-paper", "bg-paper text-ink", "bg-ink text-paper"];

/** How many columns the wall has. Before hydration phones still read one column, in order (CSS order on a flattened flex). */
function useColumns() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const q2 = window.matchMedia("(min-width: 768px)");
    const q3 = window.matchMedia("(min-width: 1100px)");
    const on = () => setN(q3.matches ? 3 : q2.matches ? 2 : 1);
    on();
    q2.addEventListener("change", on);
    q3.addEventListener("change", on);
    return () => {
      q2.removeEventListener("change", on);
      q3.removeEventListener("change", on);
    };
  }, []);
  return n;
}

/** One window on the wall: peeks in when it reaches the screen, then keeps its own idle loop. */
function WallWindow({ item, order, col }) {
  const { sty, lang, href } = useLang();
  const reduce = useReducedMotion();
  const L = localize(item, lang);
  const r = seeded(item.slug);
  const r2 = seeded(item.slug, 7);
  const flip = lang === "he" ? -1 : 1;
  const tilt = Number(((r - 0.5) * 2.6).toFixed(2)) * flip;
  const aspect = ASPECTS[Math.floor(r2 * ASPECTS.length)];
  return (
    <motion.article
      style={{ order }}
      initial={reduce ? false : { opacity: 0, y: 110, x: (col - 1) * 50 * flip, rotate: tilt * 5 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      viewport={{ once: true, margin: "0px 0px 80px 0px" }}
      transition={{ type: "spring", stiffness: 85, damping: 15, mass: 0.9, opacity: { duration: 0.3 } }}
      className="relative"
    >
      <div
        className={reduce ? "relative" : "alive relative hover:[animation-play-state:paused]"}
        style={{
          "--life": LIVES[Math.floor(r * LIVES.length)],
          "--dur": `${6 + r2 * 4}s`,
          "--amp": `${4 + r * 5}px`,
          "--rot": `${tilt}deg`,
          "--swing": "0.7deg",
          "--delay": `${-r2 * 8}s`,
          transform: reduce ? `rotate(${tilt}deg)` : undefined,
        }}
      >
        <WindowFrame
          item={item}
          aspect={aspect}
          plate={PLATES[Math.floor(r2 * PLATES.length)]}
          sticker={
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-3.5 right-6 z-10 whitespace-nowrap rounded-full border border-ink px-2.5 py-1 text-[12px] font-medium transition-transform duration-300 ease-[var(--ease-spring)] group-hover/win:-translate-y-1.5 ${STICKERS[Math.floor(r * STICKERS.length)]}`}
              style={{ rotate: `${(r2 - 0.5) * 10 * flip}deg` }}
            >
              {sty(item.style || "Warm Editorial")}
            </span>
          }
        >
          <div className="relative flex items-start justify-between gap-3 border-t border-ink p-4">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em]">
                <Link href={href(`/vault/${item.slug}`)} className="focus-ring hover:underline hover:decoration-1 hover:underline-offset-4">
                  {L.title}
                </Link>
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-2">{L.description}</p>
            </div>
            <CopyButton text={item.claudePrompt} size="sm" toastSub={L.title} className="relative z-10 shrink-0" />
          </div>
        </WindowFrame>
      </div>
    </motion.article>
  );
}

/** A column of windows that slides at its own speed while the wall scrolls past. */
function Column({ items, col, of, progress, reduce }) {
  const speeds = of === 3 ? [40, -110, 70] : of === 2 ? [30, -60] : [0];
  const y = useTransform(progress, [0, 1], [0, speeds[col] || 0]);
  const pad = of === 3 ? ["md:pt-16", "md:pt-0", "md:pt-28"][col] : of === 2 ? ["md:pt-0", "md:pt-20"][col] : "";
  return (
    <motion.div style={reduce || of === 1 ? undefined : { y }} className={`contents md:flex md:min-w-0 md:flex-1 md:flex-col md:gap-14 ${pad}`}>
      <AnimatePresence initial={false}>
        {items.map(({ item, order }) => (
          <WallWindow key={item.slug} item={item} order={order} col={of === 1 ? 1 : col} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

/** The library as a wall of live windows: search and style filter on top, three drifting columns below. */
export default function VaultGrid({ items }) {
  const { t, sty } = useLang();
  const reduce = useReducedMotion();
  const [style, setStyle] = useState("All styles");
  const [q, setQ] = useState("");
  const cols = useColumns();
  const wall = useRef(null);
  const { scrollYProgress } = useScroll({ target: wall, offset: ["start end", "end start"] });

  const styles = useMemo(() => {
    const counts = {};
    for (const it of items) counts[it.style || "Warm Editorial"] = (counts[it.style || "Warm Editorial"] || 0) + 1;
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  // Mix wild and calm so neighbouring windows rarely share a mood: newest first, alternating with the classics.
  const ordered = useMemo(() => {
    const half = Math.ceil(items.length / 2);
    const fresh = items.slice(half).reverse();
    const older = items.slice(0, half);
    const out = [];
    for (let i = 0; i < Math.max(fresh.length, older.length); i++) {
      if (fresh[i]) out.push(fresh[i]);
      if (older[i]) out.push(older[i]);
    }
    return out;
  }, [items]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ordered.filter((it) => {
      if (style !== "All styles" && (it.style || "Warm Editorial") !== style) return false;
      if (!needle) return true;
      const h = localize(it, "he");
      return (it.title + " " + it.description + " " + h.title + " " + h.description + " " + it.tags.join(" ") + " " + (it.style || "")).toLowerCase().includes(needle);
    });
  }, [ordered, style, q]);

  const columns = useMemo(() => {
    const out = Array.from({ length: cols }, () => []);
    filtered.forEach((item, order) => out[order % cols].push({ item, order }));
    return out;
  }, [filtered, cols]);

  return (
    <section id="vault" className="dot-field scroll-mt-20 overflow-hidden border-b border-ink" aria-labelledby="vault-title">
      <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-16 md:px-8 md:pt-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-ink pb-6">
          <div className="col-span-12 md:col-span-7">
            <p className="label flex items-center gap-2 text-ink-3">
              <span aria-hidden className="live-dot size-2 rounded-full bg-terracotta" />
              {t.vault.wall(items.length)}
            </p>
            <h2 id="vault-title" className="mt-3 text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              {t.vault.title[0]}<span className="font-serif font-normal italic text-cobalt rtl:not-italic">{t.vault.title[1]}</span>{t.vault.title[2]}
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

        <div className="-mx-5 mt-5 flex items-center gap-1.5 overflow-x-auto px-5 py-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          <span className="me-1 shrink-0 label text-ink-3">{t.vault.language}</span>
          {[["All styles", items.length], ...styles].map(([sname, n]) => (
            <button
              key={sname}
              onClick={() => setStyle(sname)}
              aria-pressed={style === sname}
              className={`focus-ring shrink-0 rounded-full border px-2.5 py-1 text-xs transition-[background-color,border-color,color,transform] duration-150 active:scale-95 ${style === sname ? "border-cobalt bg-cobalt text-paper" : "border-ink/30 bg-paper hover:border-ink"}`}
            >
              {sname === "All styles" ? t.vault.allStyles : sty(sname)} <span className="font-mono text-[10px] opacity-60">{n}</span>
            </button>
          ))}
        </div>

        {filtered.length > 0 && (
          <div className="mt-12">
            <div className="mb-10 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-3xl font-semibold tracking-[-0.03em]">{t.vault.websites[0]} <span className="font-mono text-sm text-ink-3">{t.vault.sites(filtered.length)}</span></h3>
              <p className="text-sm text-ink-2">{t.vault.websites[1]}</p>
            </div>
            <div ref={wall} className="flex flex-col gap-12 md:flex-row md:items-start md:gap-10 lg:gap-12">
              {columns.map((list, c) => (
                <Column key={c} items={list} col={c} of={cols} progress={scrollYProgress} reduce={reduce} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="py-16 text-center font-serif text-2xl italic text-ink-3 rtl:not-italic">{t.vault.empty(q)}</p>
        )}
      </div>
    </section>
  );
}
