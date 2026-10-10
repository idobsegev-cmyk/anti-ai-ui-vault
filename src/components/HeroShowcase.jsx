"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import LivePreview from "./LivePreview";
import SitePreview from "./SitePreview";
import { WEBSITE, localize } from "@/lib/data";
import CopyButton from "./CopyButton";
import { useLang } from "@/lib/i18n";

const HOLD_MS = 5200;
const SITE_HOLD_MS = 13000;

/**
 * First-screen proof: a stack of live vault components that cycles on its own.
 * Visitors can touch the front card, jump to any of the featured pieces, or copy its prompt.
 */
export default function HeroShowcase({ items }) {
  const reduce = useReducedMotion();
  const { t, cat, lang, href } = useLang();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [paused, setPaused] = useState(false);
  const item = items[i];

  useEffect(() => {
    if (reduce || hold || paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), items[i].category === WEBSITE ? SITE_HOLD_MS : HOLD_MS);
    return () => clearTimeout(t);
  }, [i, hold, paused, reduce, items.length]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-3" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
      <div className="relative">
        {/* paper cards behind the live one, so it reads as a deck you can flip through */}
        <span aria-hidden className="absolute inset-0 translate-x-3 rtl:-translate-x-3 translate-y-3 rotate-[1.5deg] rounded-2xl border border-ink bg-paper-3" />
        <span aria-hidden className="absolute inset-0 translate-x-1.5 rtl:-translate-x-1.5 translate-y-1.5 rotate-[0.6deg] rounded-2xl border border-ink bg-paper-2" />

        <div className="relative overflow-hidden rounded-2xl border border-ink bg-paper">
          <div className="flex items-center justify-between gap-3 border-b border-ink px-3 py-2">
            <span className="flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-cobalt" />
              <span className="shrink-0 text-cobalt">{t.showcase.live}</span>
              <span className="truncate text-ink-3">{cat(item.category)}</span>
            </span>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? t.showcase.resume : t.showcase.pause}
              className="focus-ring flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink hover:bg-paper-2"
            >
              {paused ? <Play size={11} strokeWidth={2} /> : <Pause size={11} strokeWidth={2} />}
            </button>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={item.slug}
              initial={{ x: 60, opacity: 0, rotate: 1.5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -60, opacity: 0, rotate: -1.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              {item.category === WEBSITE ? (
                <SitePreview eager autoplay code={item.previewCode} id={`hero-${item.slug}`} className="w-full" />
              ) : (
                <LivePreview eager code={item.previewCode} id={`hero-${item.slug}`} className="w-full" designWidth={520} designHeight={390} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink px-3 py-2.5">
            <Link href={href(`/vault/${item.slug}`)} className="focus-ring group flex min-w-0 items-center gap-1.5 text-sm font-semibold tracking-tight">
              <span className="truncate">{localize(item, lang).title}</span>
              <ArrowUpRight size={14} strokeWidth={1.75} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </Link>
            <CopyButton text={item.claudePrompt} size="sm" toastSub={localize(item, lang).title} />
          </div>

          {/* time-to-next indicator */}
          {!reduce && !paused && (
            <motion.span
              key={`bar-${i}-${hold}`}
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-cobalt rtl:origin-right"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hold ? 0 : 1 }}
              transition={{ duration: hold ? 0 : (item.category === WEBSITE ? SITE_HOLD_MS : HOLD_MS) / 1000, ease: "linear" }}
            />
          )}
        </div>
      </div>

      <div role="tablist" aria-label={t.showcase.label} className="mt-2 flex gap-1.5">
        {items.map((it, n) => (
          <button
            key={it.slug}
            role="tab"
            aria-selected={n === i}
            aria-label={localize(it, lang).title}
            title={localize(it, lang).title}
            onClick={() => setI(n)}
            className={`focus-ring h-2 rounded-full border border-ink transition-[width,background-color] duration-300 ${n === i ? "w-8 bg-ink" : "w-2 bg-paper hover:bg-paper-3"}`}
          />
        ))}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {t.showcase.tryIt}
        </span>
      </div>
    </div>
  );
}
