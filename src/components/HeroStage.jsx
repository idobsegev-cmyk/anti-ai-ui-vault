"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, cubicBezier, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SitePreview from "./SitePreview";
import CopyButton from "./CopyButton";
import Magnetic from "./Magnetic";
import { localize } from "@/lib/data";
import { promptParts } from "@/lib/prompt-parts";
import { useLang } from "@/lib/i18n";

const EASE_OUT = [0.23, 1, 0.32, 1];
const scrollEase = cubicBezier(0.65, 0, 0.35, 1);

function Headline({ count, compact = false, id = "hero-title" }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const home = lang === "he" ? "/he" : "/";
  const h = t.hero.head;
  const line = (i, children) => (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay: 0.08 + i * 0.09, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
  );
  // Keep the punctuation glued to the last highlighted word so a comma can never wrap onto a line of its own.
  const hl = "font-serif font-normal italic text-cobalt rtl:not-italic";
  const words = h[1].split(" ");
  const last = words.pop();
  const accent = (
    <>
      {words.length > 0 && <span className={hl}>{words.join(" ")} </span>}
      <span className="whitespace-nowrap"><span className={hl}>{last}</span>{h[2]}</span>
    </>
  );
  return (
    <div className="max-w-[980px]">
      <h1 id={id} className="text-[clamp(2.7rem,6.2vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.05em] rtl:leading-[1.08] rtl:tracking-normal">
        {line(0, <>{h[0]}{accent}</>)}
        {line(1, h[3])}
      </h1>
      <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}>
        <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-2 md:text-xl">{t.hero.sub}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Magnetic href={`${home}#vault`} variant="solid">
            {t.hero.browse(count)} <ArrowDown size={16} strokeWidth={1.75} />
          </Magnetic>
          <Magnetic href={`${home}#custom`} variant="outline">
            {t.hero.bookCustom} <ArrowUpRight size={16} strokeWidth={1.75} className="rtl:-scale-x-100" />
          </Magnetic>
          {!compact && <span className="label hidden text-ink-3 xl:inline">{t.hero.scroll} ↓</span>}
        </div>
      </motion.div>
    </div>
  );
}

function Frame({ item, eager }) {
  return (
    <div data-touch-scroll className="overflow-hidden rounded-[20px] border border-ink bg-paper shadow-[0_30px_60px_-30px_rgba(18,18,18,0.35)]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={item.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.25 }}>
          <SitePreview eager={eager} settle code={item.previewCode} id={`stage-${item.slug}`} className="w-full" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** "Gat & Daughters Olive Oil Website" -> "Gat & Daughters": the business name reads the same in both languages. */
function brandName(title) {
  const words = title.split(" ");
  const tail = /^(Website|Site|Landing|Page|Olive|Oil|IT|Networks|Athlete|Bakery|Architects|Hotel|Agency|Studio|Festival|Game|Shop|SaaS|Habit|App)$/;
  while (words.length > 1 && tail.test(words[words.length - 1])) words.pop();
  return words.join(" ");
}

function clip(s, n) {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

function Lens({ items, i, setI, count }) {
  const { t, lang, href, sty } = useLang();
  const item = items[i];
  const L = localize(item, lang);
  const P = promptParts(item.claudePrompt);
  const rows = [
    ["concept", [clip(P.concept, 190)]],
    ["layout", P.layout.slice(1, 2).map((b) => clip(b, 150))],
    ["motion", P.motion.slice(0, 1).map((b) => clip(b, 150))],
    ["system", P.system.slice(0, 1).map((b) => clip(b, 120))],
  ];
  return (
    <div>
      <h2 className="text-[clamp(2rem,3.4vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.04em] rtl:leading-[1.1] rtl:tracking-normal">
        {t.hero.lensTitle[0]}<span className="font-serif font-normal italic rtl:not-italic">{t.hero.lensTitle[1]}</span>{t.hero.lensTitle[2]}
      </h2>
      <p className="mt-4 max-w-[480px] text-base leading-relaxed text-ink-2">{t.hero.lensText}</p>

      <div role="tablist" aria-label={t.hero.pick} className="mt-6 flex flex-wrap gap-1.5">
        {items.map((it, n) => (
          <button
            key={it.slug}
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`focus-ring rounded-full border px-3 py-1 text-[13px] transition-colors duration-150 ${n === i ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}
          >
            <bdi>{brandName(it.title)}</bdi>
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-ink bg-paper">
        <div className="flex items-center justify-between gap-3 border-b border-ink/15 px-4 py-2.5">
          <span className="label truncate text-ink-3">{sty(item.style)} · Claude prompt</span>
          <CopyButton text={item.claudePrompt} size="sm" toastSub={L.title} />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.dl
            key={item.slug}
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="divide-y divide-ink/10"
          >
            {rows.map(([k, lines]) => (
              <div key={k} className="grid grid-cols-[96px_1fr] gap-3 px-4 py-3">
                <dt className="label pt-0.5 text-cobalt">{t.hero.parts[k]}</dt>
                <dd dir="ltr" lang="en" className="space-y-1 font-mono text-[12px] leading-[1.55] text-ink-2">
                  {lines.map((l, n) => <p key={n}>{l}</p>)}
                </dd>
              </div>
            ))}
          </motion.dl>
        </AnimatePresence>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link href={href(`/vault/${item.slug}`)} className="focus-ring group inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-ink/25 underline-offset-[5px] hover:decoration-ink">
          {t.hero.open} <ArrowUpRight size={14} strokeWidth={1.75} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </Link>
      </div>
    </div>
  );
}

/**
 * First screen: the promise, then the proof. On large screens a live library design opens full-bleed under the
 * headline; scrolling settles it into a card while the prompt behind it slides in beside it.
 */
export default function HeroStage({ count, items }) {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const rtl = lang === "he";
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const hOp = useTransform(p, [0, 0.28], [1, 0]);
  const hY = useTransform(p, [0, 0.28], [0, -48]);
  const scale = useTransform(p, [0.04, 0.72], [1, 0.5], { ease: scrollEase });
  const y = useTransform(p, [0.04, 0.72], ["62vh", "14vh"], { ease: scrollEase });
  const x = useTransform(p, [0.04, 0.72], ["0%", rtl ? "-50%" : "50%"], { ease: scrollEase });
  const lOp = useTransform(p, [0.55, 0.85], [0, 1]);
  const lY = useTransform(p, [0.55, 0.85], [24, 0]);
  const lPe = useTransform(p, (v) => (v > 0.6 ? "auto" : "none"));
  const hPe = useTransform(p, (v) => (v < 0.2 ? "auto" : "none"));
  const item = items[i];

  return (
    <div aria-labelledby="hero-title" className="border-b border-ink">
      {/* Large screens: the scroll-driven stage */}
      <section ref={ref} className={reduce ? "hidden" : "relative hidden h-[260vh] lg:block"}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="relative mx-auto h-full max-w-[1400px] px-8">
            <motion.div style={{ opacity: hOp, y: hY, pointerEvents: hPe }} className="relative z-10 pt-[13vh]">
              <Headline count={count} />
            </motion.div>
            <motion.div style={{ x, y, scale, transformOrigin: rtl ? "top right" : "top left" }} className="absolute inset-x-8 top-0 z-0 will-change-transform">
              <Frame item={item} eager />
            </motion.div>
            <motion.div style={{ opacity: lOp, y: lY, pointerEvents: lPe }} className="absolute start-8 top-[14vh] z-10 w-[44%]">
              <Lens items={items} i={i} setI={setI} count={count} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phones, tablets and reduced motion: the same story, stacked */}
      <section className={reduce ? "mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:px-8" : "mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:px-8 lg:hidden"}>
        <Headline count={count} compact id="hero-title-stacked" />
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <div className="lg:order-2"><Frame item={item} /></div>
          <Lens items={items} i={i} setI={setI} count={count} />
        </div>
      </section>
    </div>
  );
}
