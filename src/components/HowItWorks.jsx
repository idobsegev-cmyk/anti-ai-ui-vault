"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useLang();
  return (
    <section id="how" className="scroll-mt-20 border-b border-ink bg-paper-2" aria-labelledby="how-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-16 md:px-8 md:py-24">
        <div className="col-span-12 md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">{t.how.kicker}</p>
          <h2 id="how-title" className="mt-2 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] rtl:tracking-[-0.01em]">
            {t.how.title[0]}
            <span className="font-serif font-normal italic rtl:not-italic">{t.how.title[1]}</span>
            {t.how.title[2]}
          </h2>
        </div>
        <ol className="col-span-12 border-t border-ink md:col-span-8">
          {t.how.steps.map(([title, body], i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.08 }}
              className="grid grid-cols-12 gap-4 border-b border-ink py-6"
            >
              <span className="col-span-2 font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="col-span-10 text-2xl font-semibold tracking-[-0.03em] md:col-span-4">{title}</h3>
              <p className="col-span-12 text-base leading-snug text-ink-2 md:col-span-6">{body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
