"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";

// Each word gets its own typeface, color and way of arriving, so the type acts out the adjective.
const PALETTE = ["var(--color-terracotta)", "var(--color-cobalt)", "var(--color-ink)"];

export const WORDS = [
  {
    word: "Alive",
    style: { fontFamily: "var(--font-bricolage), var(--font-sans)", fontWeight: 800, color: "var(--color-terracotta)", letterSpacing: "-0.05em" },
    letter: {
      hidden: { y: "-80%", opacity: 0, rotate: -12 },
      show: (i) => ({ y: "0%", opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 520, damping: 11, delay: i * 0.05 } }),
      exit: (i) => ({ y: "70%", opacity: 0, transition: { duration: 0.18, delay: i * 0.02 } }),
    },
    idle: (i) => ({ y: [0, -6, 0], transition: { duration: 0.9, repeat: Infinity, delay: 0.6 + i * 0.09, ease: "easeInOut" } }),
  },
  {
    word: "Human",
    style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--color-cobalt)", letterSpacing: "-0.03em" },
    letter: {
      hidden: { y: "40%", opacity: 0, rotate: 6 },
      show: (i) => ({ y: "0%", opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 18, delay: i * 0.06 } }),
      exit: { opacity: 0, y: "-30%", transition: { duration: 0.2 } },
    },
    underline: true,
  },
  {
    word: "Creative",
    style: { fontFamily: "var(--font-caveat), cursive", fontWeight: 700, letterSpacing: "-0.01em" },
    multicolor: true,
    scale: 1.12,
    letter: {
      hidden: (i) => ({ opacity: 0, scale: 0.2, rotate: (i % 2 ? 1 : -1) * 40, x: (i % 3) * 8 - 8 }),
      show: (i) => ({ opacity: 1, scale: 1, rotate: (i % 2 ? 1 : -1) * 5, x: 0, transition: { type: "spring", stiffness: 380, damping: 13, delay: i * 0.04 } }),
      exit: (i) => ({ opacity: 0, scale: 0.4, rotate: (i % 2 ? -1 : 1) * 30, transition: { duration: 0.2 } }),
    },
  },
  {
    word: "Young",
    style: { fontFamily: "var(--font-bagel), var(--font-sans)", fontWeight: 400, color: "var(--color-paper)", letterSpacing: "-0.02em" },
    sticker: "var(--color-cobalt)",
    scale: 0.82,
    whole: {
      hidden: { scale: 0, rotate: -14 },
      show: { scale: 1, rotate: -3, transition: { type: "spring", stiffness: 500, damping: 12 } },
      exit: { scale: 0, rotate: 10, transition: { duration: 0.18 } },
    },
  },
  {
    word: "Modern",
    style: { fontFamily: "var(--font-unbounded), var(--font-sans)", fontWeight: 300, color: "var(--color-ink)", textTransform: "uppercase", letterSpacing: "-0.02em" },
    scale: 0.74,
    letter: {
      hidden: { x: "-60%", opacity: 0 },
      show: (i) => ({ x: "0%", opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30, delay: i * 0.035 } }),
      exit: (i) => ({ x: "60%", opacity: 0, transition: { duration: 0.16, delay: i * 0.015 } }),
    },
  },
  {
    word: "Timeless",
    style: { fontFamily: "var(--font-bodoni), var(--font-serif)", fontStyle: "italic", fontWeight: 500, color: "var(--color-ink)", letterSpacing: "-0.035em" },
    letter: {
      hidden: { opacity: 0, y: "12%" },
      show: (i) => ({ opacity: 1, y: "0%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.045 } }),
      exit: { opacity: 0, transition: { duration: 0.2 } },
    },
  },
  {
    word: "Bold",
    style: { fontFamily: "var(--font-anton), var(--font-sans)", fontWeight: 400, color: "var(--color-paper)", textTransform: "uppercase", letterSpacing: "0.01em" },
    block: "var(--color-terracotta)",
    scale: 0.9,
    whole: {
      hidden: { scale: 1.8, opacity: 0, rotate: 4 },
      show: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 700, damping: 18 } },
      exit: { scale: 0.7, opacity: 0, transition: { duration: 0.15 } },
    },
  },
  {
    word: "Warm",
    style: { fontFamily: "var(--font-fraunces), var(--font-serif)", fontWeight: 600, color: "var(--color-terracotta)", letterSpacing: "-0.04em", fontVariationSettings: '"SOFT" 100, "WONK" 1' },
    letter: {
      hidden: { y: "60%", opacity: 0, scaleY: 0.6 },
      show: (i) => ({ y: "0%", opacity: 1, scaleY: 1, transition: { type: "spring", stiffness: 200, damping: 14, delay: i * 0.08 } }),
      exit: { opacity: 0, y: "-20%", transition: { duration: 0.2 } },
    },
  },
];

// Hebrew versions: same motion per word, Hebrew-capable faces with a matching character.
const HE = {
  Alive: { word: "חי", fontFamily: "'Secular One', var(--font-sans)", fontWeight: 400 },
  Human: { word: "אנושי", fontFamily: "var(--font-serif)", fontWeight: 500 },
  Creative: { word: "יצירתי", fontFamily: "'Solitreo', cursive", fontWeight: 400 },
  Young: { word: "צעיר", fontFamily: "'Varela Round', var(--font-sans)", fontWeight: 400 },
  Modern: { word: "מודרני", fontFamily: "var(--font-sans)", fontWeight: 200 },
  Timeless: { word: "על־זמני", fontFamily: "'Bellefair', var(--font-serif)", fontWeight: 400 },
  Bold: { word: "נועז", fontFamily: "'Karantina', var(--font-sans)", fontWeight: 700, scale: 1.25 },
  Warm: { word: "חם", fontFamily: "'Suez One', var(--font-serif)", fontWeight: 400 },
};

export const WORDS_HE = WORDS.map((w) => {
  const h = HE[w.word];
  return {
    ...w,
    word: h.word,
    scale: h.scale || w.scale,
    style: { ...w.style, fontFamily: h.fontFamily, fontWeight: h.fontWeight, fontStyle: "normal", textTransform: "none", letterSpacing: "0", fontVariationSettings: "normal" },
  };
});

const HOLD_MS = 2600;

function Underline() {
  return (
    <svg viewBox="0 0 300 30" className="pointer-events-none absolute -bottom-[0.08em] left-0 h-[0.22em] w-full overflow-visible" fill="none" aria-hidden>
      <motion.path
        d="M4 18 C 70 6, 150 28, 296 10"
        stroke="var(--color-terracotta)"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { delay: 0.45, duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
        exit={{ opacity: 0 }}
      />
    </svg>
  );
}

function Word({ item }) {
  const letters = item.word.split("");
  const size = { fontSize: `${item.scale || 1}em` };

  if (item.whole) {
    const bg = item.sticker || item.block;
    return (
      <motion.span
        variants={item.whole}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ ...item.style, ...size, background: bg, boxShadow: item.sticker ? "0.06em 0.06em 0 var(--color-ink)" : "none" }}
        className={`inline-block leading-[1.05] ${item.sticker ? "rounded-[0.28em] px-[0.22em] py-[0.02em]" : "px-[0.12em]"}`}
      >
        {item.word}
      </motion.span>
    );
  }

  return (
    <span className="relative inline-block whitespace-nowrap" style={{ ...item.style, ...size }}>
      {letters.map((l, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={item.letter}
          initial="hidden"
          animate="show"
          exit="exit"
          className="inline-block"
          style={item.multicolor ? { color: PALETTE[i % PALETTE.length] } : undefined}
        >
          {item.idle ? (
            <motion.span className="inline-block" animate={item.idle(i)}>
              {l}
            </motion.span>
          ) : (
            l
          )}
        </motion.span>
      ))}
      {item.underline && <Underline />}
    </span>
  );
}

/**
 * The adjective at the end of the hero headline. Click or tap to advance; pauses while hovered.
 */
export default function WordRotator({ startDelay = 1400 }) {
  const reduce = useReducedMotion();
  const { lang, t } = useLang();
  const list = lang === "he" ? WORDS_HE : WORDS;
  const [i, setI] = useState(1); // open on "Human"
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (reduce || paused || !started) return;
    const t = setTimeout(() => setI((n) => (n + 1) % list.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [i, paused, started, reduce, list.length]);

  const item = list[i];

  return (
    <button
      type="button"
      onClick={() => setI((n) => (n + 1) % list.length)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-label={t.hero.nextWord(item.word)}
      className="focus-ring relative inline-flex h-[1.18em] cursor-pointer items-end align-bottom text-[1.14em]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={item.word} className="inline-flex items-end">
          <Word item={item} />
          <span className="text-ink">.</span>
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
