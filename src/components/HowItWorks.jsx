"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: "01", t: "Pick a component", d: "Play with the live preview. Drag it, hover it, break it. Every card in the vault is running real code." },
  { n: "02", t: "Copy the Claude prompt", d: "Each prompt spells out layout, spring values, accessibility and the design guardrails that keep it from looking generated." },
  { n: "03", t: "Paste & ship", d: "Paste into Claude, get a self-contained React + Tailwind + Framer Motion file. Or grab the preview code directly from the detail page." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-ink bg-paper-2" aria-labelledby="how-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-16 md:px-8 md:py-24">
        <div className="col-span-12 md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">How it works</p>
          <h2 id="how-title" className="mt-2 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            Three steps, <span className="font-serif font-normal italic">zero</span> templates.
          </h2>
        </div>
        <ol className="col-span-12 border-t border-ink md:col-span-8">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.08 }}
              className="grid grid-cols-12 gap-4 border-b border-ink py-6"
            >
              <span className="col-span-2 font-mono text-sm">{s.n}</span>
              <h3 className="col-span-10 text-2xl font-semibold tracking-[-0.03em] md:col-span-4">{s.t}</h3>
              <p className="col-span-12 text-base leading-snug text-ink-2 md:col-span-6">{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
