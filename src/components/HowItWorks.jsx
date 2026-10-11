"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, MousePointer2, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";

// A looping, silent "video" of using the vault: pick → copy → paste into Claude → ship.
const SCENES = [3200, 2600, 3600, 3000]; // ms per scene
const CURSOR = [
  { x: "52%", y: "46%" }, // over card 2
  { x: "64%", y: "78%" }, // over the copy button
  { x: "84%", y: "86%" }, // over Claude's send button
  { x: "70%", y: "40%" }, // resting on the result
];

function Window({ title, children, tone = "bg-paper" }) {
  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-ink ${tone}`}>
      <div className="flex items-center gap-1.5 border-b border-ink px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-terracotta" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-[#F6C21B]" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-paper-3" />
        <span className="mx-auto rounded-full border border-ink/30 px-3 py-0.5 font-mono text-[10px] text-ink-3" dir="ltr">{title}</span>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

function VaultScene({ copied }) {
  const { t, lang } = useLang();
  const D = t.how.demo;
  const cards = [
    { c: "#FFE600", label: D.cards[0] },
    { c: "#1D4ED8", label: D.cards[1] },
    { c: "#D9534F", label: D.cards[2] },
  ];
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-4" dir={lang === "he" ? "rtl" : "ltr"}>
      {cards.map((k, i) => (
        <motion.div
          key={k.label}
          animate={i === 1 ? { y: -6, boxShadow: "6px 6px 0 #121212" } : { y: 0, boxShadow: "0px 0px 0 #121212" }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.9 }}
          className="flex flex-col overflow-hidden rounded-xl border border-ink bg-paper"
        >
          <div className="relative flex-1" style={{ background: k.c }}>
            {i === 1 && (
              <motion.div className="absolute inset-x-4 top-1/3 h-3 rounded bg-paper" animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ originX: 0 }} />
            )}
          </div>
          <div className="flex items-center justify-between gap-1 border-t border-ink p-2">
            <span className="truncate text-[11px] font-semibold">{k.label}</span>
            {i === 1 && (
              <motion.span
                animate={{ backgroundColor: copied ? "#1D4ED8" : "#121212" }}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold text-paper"
              >
                {copied ? <Check size={10} strokeWidth={2.5} /> : <Copy size={10} strokeWidth={2} />}
                {copied ? D.copied : D.copy}
              </motion.span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ClaudeScene() {
  const { t, lang } = useLang();
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setSent(true), 1400);
    return () => clearTimeout(id);
  }, []);
  const lines = [92, 78, 85, 60, 70];
  return (
    <div className="flex h-full flex-col justify-between p-4" dir={lang === "he" ? "rtl" : "ltr"}>
      <AnimatePresence>
        {sent && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="ms-auto w-2/3 rounded-xl bg-paper-3 p-2.5">
              {lines.slice(0, 3).map((w, i) => <div key={i} className="mb-1 h-1.5 rounded bg-ink/30" style={{ width: w + "%" }} />)}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} className="w-3/4 rounded-xl border border-ink bg-ink p-2.5">
              {lines.map((w, i) => (
                <motion.div key={i} initial={{ width: 0 }} animate={{ width: w + "%" }} transition={{ delay: 0.7 + i * 0.18, duration: 0.3 }} className="mb-1 h-1.5 rounded" style={{ background: i % 2 ? "#DBE4FB" : "#F6DCD9" }} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-2 rounded-xl border border-ink bg-paper p-2">
        <div className="flex-1 overflow-hidden">
          {!sent ? (
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeOut" }} className="space-y-1">
              <div className="h-1.5 rounded bg-ink/40" style={{ width: "88%" }} />
              <div className="h-1.5 rounded bg-ink/40" style={{ width: "64%" }} />
            </motion.div>
          ) : (
            <span className="font-mono text-[10px] text-ink-3">{t.how.demo.reply}</span>
          )}
        </div>
        <motion.span animate={sent ? { scale: [1, 0.85, 1] } : {}} className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-paper">
          <Send size={12} strokeWidth={2} />
        </motion.span>
      </div>
    </div>
  );
}

function ShipScene() {
  const { t, lang } = useLang();
  const D = t.how.demo;
  return (
    <div className="flex h-full flex-col" dir={lang === "he" ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between border-b border-ink/20 px-4 py-2 text-[11px] font-bold">
        <span dir="ltr">{D.domain}</span>
        <span className="rounded-full bg-ink px-2 py-0.5 text-[9px] text-paper">{D.live}</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-3 bg-[#F2EFE8]">
        {["#D9534F", "#FAF9F6", "#1D4ED8"].map((c, i) => (
          <motion.span
            key={c}
            initial={{ y: 30, opacity: 0, boxShadow: "4px 4px 0 #121212" }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.2 + i * 0.12 }}
            className="rounded-lg border-[1.5px] border-ink px-4 py-2 text-xs font-bold"
            style={{ background: c, color: i === 1 ? "#121212" : "#FAF9F6" }}
          >
            {D.buttons[i]}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function DemoLoop({ scene }) {
  const reduce = useReducedMotion();
  const copied = scene >= 1;
  return (
    <div className="relative aspect-[16/10] w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene < 2 ? "vault" : scene === 2 ? "claude" : "ship"}
          initial={{ opacity: 0, scale: 0.97, rotate: -0.6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="absolute inset-0"
        >
          {scene < 2 && (
            <Window title="specimen">
              <VaultScene copied={copied} />
            </Window>
          )}
          {scene === 2 && (
            <Window title="claude.ai" tone="bg-[#F7F4EE]">
              <ClaudeScene />
            </Window>
          )}
          {scene === 3 && (
            <Window title="yourbrand.com">
              <ShipScene />
            </Window>
          )}
        </motion.div>
      </AnimatePresence>

      {/* the cursor */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-10 text-ink"
          animate={{ left: CURSOR[scene].x, top: CURSOR[scene].y }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          <motion.span key={scene} className="block" initial={{ scale: 1 }} animate={{ scale: [1, 1, 0.8, 1] }} transition={{ duration: 0.5, delay: 1.1, times: [0, 0.4, 0.7, 1] }}>
            <MousePointer2 size={26} strokeWidth={1.75} fill="#FAF9F6" />
          </motion.span>
        </motion.div>
      )}

      {/* the toast after copying */}
      <AnimatePresence>
        {scene === 1 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1.3, type: "spring", stiffness: 400, damping: 26 } }}
            exit={{ opacity: 0 }}
            dir="ltr"
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink py-1.5 pl-1.5 pr-4 text-xs font-medium text-paper shadow-[3px_3px_0_var(--color-cobalt)]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cobalt"><Check size={11} strokeWidth={2.5} /></span>
            Prompt copied
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => setScene((s) => (s + 1) % SCENES.length), SCENES[scene]);
    return () => clearTimeout(id);
  }, [scene, paused, reduce]);

  // scene → step: 0 pick, 1 copy, 2 paste, 3 ship
  return (
    <section id="how" className="scroll-mt-20 border-b border-ink bg-paper-2" aria-labelledby="how-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-center gap-8 px-5 py-16 md:px-8 md:py-24">
        <div className="col-span-12 md:col-span-4">
          <p className="label text-ink-3">{t.how.kicker}</p>
          <h2 id="how-title" className="mt-2 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] rtl:tracking-[-0.01em]">
            {t.how.title[0]}
            <span className="font-serif font-normal italic rtl:not-italic">{t.how.title[1]}</span>
            {t.how.title[2]}
          </h2>
          <ol className="mt-8 flex flex-col gap-2" aria-label={t.how.kicker}>
            {t.how.chips.map((c, i) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setScene(i)}
                  aria-current={scene === i ? "step" : undefined}
                  className="focus-ring relative flex w-full items-center gap-3 overflow-hidden rounded-full border border-ink px-4 py-2.5 text-start text-sm font-semibold"
                >
                  {scene === i && (
                    <motion.span layoutId="how-step" transition={{ type: "spring", stiffness: 400, damping: 34 }} className="absolute inset-0 bg-ink" />
                  )}
                  <span className={`relative font-mono text-[11px] ${scene === i ? "text-paper/60" : "text-ink-3"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={`relative ${scene === i ? "text-paper" : ""}`}>{c}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="col-span-12 md:col-span-8" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <DemoLoop scene={scene} />
        </div>
      </div>
    </section>
  );
}
