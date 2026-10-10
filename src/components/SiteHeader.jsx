"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGroup, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "/#vault", label: "Vault" },
  { href: "/#how", label: "How it works" },
  { href: "/#custom", label: "Custom site" },
];

export default function SiteHeader({ count }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hover, setHover] = useState(null);
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setCompact(y > 40);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink bg-paper"
    >
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-[padding] duration-300 md:px-8 ${compact ? "py-2.5" : "py-4"}`}>
        <Link href="/" className="focus-ring group flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-[-0.03em]">
            Anti-AI<span className="font-serif font-normal italic text-cobalt"> UI </span>Vault
          </span>
          <span className="hidden font-mono text-[10px] text-ink-3 sm:inline" lang="he" dir="rtl">
            מבצר העיצוב
          </span>
        </Link>

        <LayoutGroup id="site-nav">
          <nav aria-label="Main" onPointerLeave={() => setHover(null)} className="hidden items-center gap-1 md:flex">
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onPointerEnter={() => setHover(i)}
                className="focus-ring relative rounded-full px-3.5 py-1.5 text-sm"
              >
                {hover === i && (
                  <motion.span layoutId="site-pill" transition={{ type: "spring", stiffness: 500, damping: 38 }} className="absolute inset-0 rounded-full bg-ink" />
                )}
                <span className={`relative transition-colors ${hover === i ? "text-paper" : ""}`}>{l.label}</span>
              </Link>
            ))}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[11px] text-ink-3 lg:inline">{count} components · updated daily</span>
          <Link href="/#custom" className="focus-ring inline-flex items-center gap-1 rounded-full bg-terracotta px-3.5 py-1.5 text-sm font-medium text-paper">
            Book a site <ArrowUpRight size={14} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
      <motion.span style={{ scaleX: progress }} className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-cobalt" />
    </motion.header>
  );
}
