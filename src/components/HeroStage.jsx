"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import WindowFrame from "./WindowFrame";
import Magnetic from "./Magnetic";
import { localize } from "@/lib/data";
import { brandOf } from "@/lib/palette";
import { useLang } from "@/lib/i18n";

const EASE_OUT = [0.23, 1, 0.32, 1];

/*
 * The window wall on large screens. Positions are in % of the stage (inline-start, so Hebrew mirrors it), widths in vw.
 * depth drives cursor parallax, scroll speed and stacking; life is the idle loop each window keeps.
 */
const WALL = [
  { left: 57, top: 13, w: 29, aspect: "4 / 3", depth: 1, rot: -1.6, life: "win-drift", dur: 9, amp: 7, live: true, autoplay: true, plate: "cobalt", from: [260, -160] },
  { left: 79, top: 41, w: 23, aspect: "4 / 5", depth: 0.75, rot: 2.4, life: "win-sway", dur: 7.5, amp: 6, live: true, autoplay: true, plate: "ink", from: [320, 60] },
  { left: 47, top: 55, w: 26, aspect: "16 / 10", depth: 1.25, rot: 1.2, life: "win-bob", dur: 6, amp: 9, live: true, plate: "terracotta", from: [80, 320] },
  { left: 3, bottom: -9, w: 21, aspect: "4 / 3", depth: 0.7, rot: -3, life: "win-peek", dur: 8, amp: 8, live: true, plate: "ink", from: [-260, 300] },
  { left: 25.5, bottom: -12, w: 18, aspect: "4 / 3", depth: 0.9, rot: 2.2, life: "win-peek", dur: 9.5, amp: 9, live: true, plate: "cobalt", from: [-60, 320] },
  { left: 85, top: 4, w: 14, aspect: "4 / 3", depth: 0.45, rot: 4, life: "win-sway", dur: 6.5, amp: 5, live: false, plate: "terracotta", from: [200, -220], chrome: "sm" },
  { left: 40, top: 3, w: 12, aspect: "4 / 3", depth: 0.4, rot: -4.5, life: "win-bob", dur: 5.5, amp: 6, live: false, plate: "ink", from: [0, -260], chrome: "sm" },
  { left: 91, bottom: -4, w: 13, aspect: "4 / 3", depth: 0.55, rot: -5, life: "win-peek", dur: 7, amp: 7, live: false, plate: "moss", from: [200, 260], chrome: "sm" },
];

function Headline({ count }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const home = lang === "he" ? "/he" : "/";
  const h = t.hero.head;
  const line = (i, children) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="inline-block bg-paper pe-[0.12em]"
        initial={reduce ? false : { y: "108%", rotate: i % 2 ? -2 : 2 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.05 + i * 0.1 }}
      >
        {children}
      </motion.span>
    </span>
  );
  // Keep the punctuation glued to the last highlighted word so a comma can never wrap onto a line of its own.
  const hl = "font-serif font-normal italic text-cobalt rtl:not-italic";
  const words = h[1].split(" ");
  const last = words.pop();
  const glued = !h[0].endsWith(" ");
  const accent = (
    <>
      {words.length > 0 && <span className={hl}>{words.join(" ")} </span>}
      <span className="whitespace-nowrap"><span className={hl}>{last}</span>{h[2]}</span>
    </>
  );
  return (
    <div>
      <h1 id="hero-title" className="text-[clamp(2.7rem,5.5vw,6rem)] font-semibold leading-[0.93] tracking-[-0.05em] rtl:leading-[1.1] rtl:tracking-normal">
        {/* Hebrew glues its prefix to the accent ("מ" + "עיצוב"), so it never gets a line of its own */}
        {glued ? line(0, <>{h[0]}{accent}</>) : <>{line(0, h[0])}{line(1, accent)}</>}
        {line(glued ? 1 : 2, h[3])}
      </h1>
      <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}>
        <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-ink-2 md:text-xl"><span className="bg-paper box-decoration-clone">{t.hero.sub}</span></p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Magnetic href={`${home}#vault`} variant="solid">
            {t.hero.browse(count)} <ArrowDown size={16} strokeWidth={1.75} />
          </Magnetic>
          <Magnetic href={`${home}#custom`} variant="outline">
            {t.hero.bookCustom} <ArrowUpRight size={16} strokeWidth={1.75} className="rtl:-scale-x-100" />
          </Magnetic>
        </div>
        <p className="label mt-5 flex max-w-[440px] items-center gap-2 text-ink-3">
          <span aria-hidden className="live-dot size-2 shrink-0 rounded-full bg-terracotta" />
          <span className="bg-paper box-decoration-clone">{t.hero.note}</span>
        </p>
      </motion.div>
    </div>
  );
}

/** A window on the wall: parallax by depth (outer), a springy entrance (middle), its own idle loop (inner). */
function HeroWindow({ spec, item, i, mx, my, p }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const flip = lang === "he" ? -1 : 1;
  const x = useTransform(mx, (v) => v * spec.depth * 28);
  const y = useTransform([my, p], ([m, s]) => m * spec.depth * 18 - s * spec.depth * 320);
  return (
    <motion.div
      className="absolute hover:!z-40"
      style={{ insetInlineStart: `${spec.left}%`, top: spec.top != null ? `${spec.top}%` : undefined, bottom: spec.bottom != null ? `${spec.bottom}%` : undefined, width: `${spec.w}vw`, zIndex: Math.round(spec.depth * 20), x, y }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, x: spec.from[0] * flip, y: spec.from[1], rotate: spec.rot * 6, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
        whileHover={reduce ? undefined : { scale: 1.04 }}
        transition={{ type: "spring", stiffness: 95, damping: 15, mass: 0.9, delay: 0.1 + i * 0.07, opacity: { duration: 0.25, delay: 0.1 + i * 0.07 } }}
      >
        <div
          className={reduce ? "" : "alive hover:[animation-play-state:paused]"}
          style={{ "--life": spec.life, "--dur": `${spec.dur}s`, "--amp": `${spec.amp}px`, "--rot": `${spec.rot * flip}deg`, "--delay": `${-i * 1.7}s`, transform: reduce ? `rotate(${spec.rot * flip}deg)` : undefined }}
        >
          <WindowFrame
            item={item}
            aspect={spec.aspect}
            plate={spec.plate}
            live={spec.live}
            priority={2}
            autoplay={spec.autoplay}
            chrome={spec.chrome}
            linkLabel={t.hero.openLabel(localize(item, lang).title)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/** A rotating stamp, the kind pinned to a match poster or a boarding gate. */
function Stamp({ count }) {
  const { t, lang } = useLang();
  const he = lang === "he";
  return (
    <div aria-hidden className="pointer-events-none relative size-[132px]">
      <div className="absolute inset-0 rounded-full border border-ink bg-terracotta" />
      <svg viewBox="0 0 132 132" dir="ltr" className="spin-slow absolute inset-0">
        <defs>
          <path id="stamp-ring" d="M66,66 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
        </defs>
        {he ? (
          // Hebrew on a curved path breaks its letter order in some browsers: a ring of ticks instead.
          <circle cx="66" cy="66" r="52" fill="none" stroke="var(--color-paper)" strokeWidth="5" strokeDasharray="1.5 6.6" />
        ) : (
          <text className="fill-paper font-mono" style={{ fontSize: 9.5 }}>
            <textPath href="#stamp-ring" textLength="312" lengthAdjust="spacing">{t.hero.stamp(count)}</textPath>
          </text>
        )}
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center text-paper">
        <span className="text-[40px] font-semibold leading-none tracking-[-0.04em]">{count}</span>
        {he && <span className="mt-1 text-[13px] font-medium leading-none">{t.hero.stampShort}</span>}
      </span>
    </div>
  );
}

/** The departures board: every design rolling past, with a status like a gate or a scoreboard. */
export function Board({ items }) {
  const { t, sty } = useLang();
  const row = items.map((it, n) => ({ it, n, status: t.hero.board[n % t.hero.board.length] }));
  const tone = ["bg-terracotta", "bg-cobalt", "bg-paper text-ink", "bg-moss"];
  return (
    <div aria-hidden className="board relative z-30 overflow-hidden border-y border-ink bg-ink py-3 text-paper">
      <div className="board-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map(({ it, n, status }) => (
              <span key={it.slug} className="flex items-center gap-3 pe-10">
                <span className="font-mono text-[11px] text-paper/50">SD{String(n + 101)}</span>
                <bdi className="text-[15px] font-semibold tracking-[-0.01em]">{brandOf(it.title)}</bdi>
                <span className="text-[13px] text-paper/70">{sty(it.style)}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tone[n % tone.length]}`}>{status}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * First screen: the promise, set on a wall of live websites. Every window runs its real code,
 * keeps its own idle motion, leans toward the cursor and drifts away at its own depth on scroll.
 */
export default function HeroStage({ count, items, all = items }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(p, [0, 1], [0, -90]);
  const flip = lang === "he" ? -1 : 1;

  const move = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    myRaw.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const pile = [items[2], items[1], items[0]].filter(Boolean);

  return (
    <div aria-labelledby="hero-title">
      <section ref={ref} onPointerMove={move} className="dot-field relative overflow-hidden lg:h-[100svh] lg:max-h-[1080px] lg:min-h-[700px]">
        {/* the wall, large screens */}
        <div className="absolute inset-0 hidden lg:block">
          {WALL.map((spec, i) => items[i] && <HeroWindow key={items[i].slug} spec={spec} item={items[i]} i={i} mx={mx} my={my} p={p} />)}
          <motion.div
            className="absolute z-30"
            style={{ insetInlineStart: "calc(57% - 70px)", top: "7%" }}
            initial={reduce ? false : { scale: 0.4, rotate: -40 * flip, opacity: 0 }}
            animate={{ scale: 1, rotate: -8 * flip, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.75 }}
          >
            <Stamp count={count} />
          </motion.div>
        </div>

        <motion.div style={reduce ? undefined : { y: headY }} className="relative z-20 px-5 pb-12 pt-28 md:px-8 lg:absolute lg:start-[4.5vw] lg:top-[17%] lg:w-[46vw] lg:p-0">
          <Headline count={count} />
        </motion.div>

        {/* phones and tablets: a small pile of windows */}
        <div className="relative mx-auto mb-14 h-[clamp(300px,82vw,560px)] w-[min(88vw,640px)] lg:hidden">
          {pile.map((it, n) => {
            const front = n === pile.length - 1;
            const rot = [-7, 5, -1.5][n] * flip;
            const off = [["-6%", "0%"], ["8%", "6%"], ["0%", "14%"]][n];
            return (
              <motion.div
                key={it.slug}
                className="absolute w-[86%]"
                style={{ insetInlineStart: off[0], top: off[1], zIndex: n + 1 }}
                initial={reduce ? false : { opacity: 0, y: 120, rotate: rot * 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.25 + n * 0.12 }}
              >
                <div className={reduce ? "" : "alive"} style={{ "--life": front ? "win-bob" : "win-sway", "--dur": `${6 + n}s`, "--amp": "6px", "--rot": `${rot}deg`, "--swing": "1.4deg", transform: reduce ? `rotate(${rot}deg)` : undefined }}>
                  <WindowFrame item={it} live={front} priority={2} autoplay={front} plate={["terracotta", "cobalt", "ink"][n]} tilt={false} chrome={front ? "md" : "sm"} linkLabel={t.hero.openLabel(localize(it, lang).title)} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-30 lg:absolute lg:inset-x-0 lg:bottom-0">
          <Board items={all} />
        </div>
      </section>
    </div>
  );
}
