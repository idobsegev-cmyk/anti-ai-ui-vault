"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LivePreview from "./LivePreview";
import { useLang } from "@/lib/i18n";
import { shortCategory } from "@/lib/data";

const HOLD = 3600;

function Slot({ list, offset, cat }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (reduce || hold) return;
    const t = setTimeout(() => setI((n) => (n + 1) % list.length), i === 0 ? HOLD + offset : HOLD);
    return () => clearTimeout(t);
  }, [i, hold, reduce, list.length, offset]);
  const item = list[i];
  return (
    <div className="min-w-0" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
      <div className="relative overflow-hidden rounded-xl border border-ink bg-paper">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={item.slug}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <LivePreview eager code={item.previewCode} id={`strip-${item.slug}`} className="w-full" designWidth={520} designHeight={390} />
          </motion.div>
        </AnimatePresence>
      </div>
      <Link href={`/vault/${item.slug}`} className="focus-ring mt-1.5 block truncate font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">
        {cat(item.category)}
      </Link>
    </div>
  );
}

/** A row of live, self-rotating features: the hero shows what sites can do instead of describing it. */
export default function FeatureStrip({ lists }) {
  const { cat: catHe, lang } = useLang();
  const cat = (c) => (lang === "he" ? catHe(c) : shortCategory(c));
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {lists.map((list, k) => (
        <div key={k} className={k === 2 ? "hidden sm:block" : ""}>
          <Slot list={list} offset={k * 1200} cat={cat} />
        </div>
      ))}
    </div>
  );
}
