"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Magnetic from "./Magnetic";

const STICKERS = [
  { label: "No neon", cls: "bg-paper border border-ink text-ink", r: -7, pos: "left-[4%] top-[12%]" },
  { label: "No glassmorphism", cls: "bg-cobalt text-paper", r: 5, pos: "left-[34%] top-[46%]" },
  { label: "Real springs", cls: "bg-terracotta text-paper", r: -4, pos: "left-[10%] top-[72%]" },
  { label: "Copy → Claude", cls: "bg-ink text-paper rounded-full", r: 8, pos: "left-[58%] top-[8%]" },
];

/** A word whose letters lean away from the cursor, like type on a loose press. */
function HumanWord() {
  const letters = "Human".split("");
  return (
    <span className="relative inline-block whitespace-nowrap font-serif font-normal italic text-cobalt" data-human>
      <span className="sr-only">Human</span>
      {letters.map((l, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          whileHover={{ y: -14, rotate: i % 2 ? 6 : -6 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
        >
          {l}
        </motion.span>
      ))}
      <svg viewBox="0 0 300 30" className="pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.22em] w-full overflow-visible" fill="none" aria-hidden>
        <motion.path
          d="M4 18 C 70 6, 150 28, 296 10"
          stroke="var(--color-terracotta)"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.15, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}

export default function Hero({ count }) {
  const h1 = useRef(null);
  const zone = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!h1.current) return;
    if (reduce) {
      gsap.set(h1.current, { autoAlpha: 1 });
      return;
    }
    gsap.registerPlugin(SplitText);
    const ctx = gsap.context(() => {
      const split = new SplitText(h1.current.querySelectorAll("[data-split]"), { type: "chars,words", mask: "chars" });
      gsap.set(h1.current, { autoAlpha: 1 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(split.chars, { yPercent: 115, rotate: 8, duration: 1.1, stagger: 0.022 })
        .from("[data-human]", { yPercent: 40, autoAlpha: 0, rotate: -6, duration: 1, ease: "back.out(2.2)" }, "-=0.75")
        .from("[data-hero-fade]", { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=0.6");
    }, zone);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={zone} className="relative overflow-hidden border-b border-ink pt-24 md:pt-28" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div data-hero-fade className="flex flex-wrap items-center justify-between gap-2 border-b border-ink pb-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span>Issue Nº 01 — The Anti-Template Issue</span>
          <span className="hidden sm:inline">{count} live components</span>
          <span>Free · Copy · Paste into Claude</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 pt-8 md:pt-12">
          <h1
            id="hero-title"
            ref={h1}
            style={{ visibility: "hidden" }}
            className="col-span-12 text-[clamp(3.1rem,9.4vw,10rem)] font-semibold leading-[0.88] tracking-[-0.055em] lg:col-span-10"
          >
            <span data-split className="block">Build Websites</span>
            <span data-split className="block">That Feel Alive</span>
            <span className="block">
              <span data-split>&amp; </span>
              <HumanWord />
              <span data-split>.</span>
            </span>
          </h1>

          <div ref={null} className="relative col-span-12 mt-6 hidden h-[260px] lg:col-span-2 lg:mt-0 lg:block">
            <StickerField />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 pb-12 pt-10 md:pb-16">
          <p data-hero-fade className="col-span-12 max-w-xl text-lg leading-snug text-ink-2 md:col-span-6">
            A vault of hand-tuned, animated components — each with a{" "}
            <span className="font-serif text-xl italic text-ink">copy-ready Claude prompt</span> and a live preview. Editorial type, honest
            springs, one human accent. Nothing that looks like it came out of a default.
          </p>
          <div data-hero-fade className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end">
            <Magnetic href="/#vault" variant="solid">
              Browse Vault <ArrowDown size={16} strokeWidth={1.75} />
            </Magnetic>
            <Magnetic href="/#custom" variant="outline">
              Book Custom Site <ArrowUpRight size={16} strokeWidth={1.75} />
            </Magnetic>
          </div>
        </div>
      </div>
      <CategoryMarquee />
    </section>
  );
}

function StickerField() {
  const ref = useRef(null);
  return (
    <div ref={ref} className="absolute inset-0 -left-24">
      {STICKERS.map((s, i) => (
        <motion.button
          key={s.label}
          type="button"
          drag
          dragConstraints={ref}
          dragElastic={0.25}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
          initial={{ scale: 0, rotate: s.r * 3 }}
          animate={{ scale: 1, rotate: s.r }}
          whileHover={{ scale: 1.06 }}
          whileDrag={{ scale: 1.1, rotate: 0, zIndex: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 1.3 + i * 0.09 }}
          className={`absolute ${s.pos} cursor-grab whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold shadow-[3px_3px_0_var(--color-ink)] active:cursor-grabbing ${s.cls}`}
          aria-label={`Sticker: ${s.label} (draggable)`}
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
}

const MARQUEE = ["Editorial Heroes", "Bento Grids", "Tactile Buttons", "Kinetic Type", "3D Cards", "Accordions", "Navigation", "Forms"];

function CategoryMarquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden border-t border-ink bg-ink py-3 text-paper" aria-hidden>
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap text-xl font-medium tracking-tight">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t}
            <span className={`font-serif text-2xl ${i % 3 === 0 ? "text-terracotta" : "text-paper/50"}`}>✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
