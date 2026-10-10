"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGroup, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function SiteHeader({ count }) {
  const { t, lang } = useLang();
  const home = lang === "he" ? "/he" : "/";
  const LINKS = [
    { href: `${home}#vault`, label: t.nav.vault },
    { href: `${home}#how`, label: t.nav.how },
    { href: `${home}#custom`, label: t.nav.custom },
  ];
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
      className="fixed inset-x-0 top-0 z-50 border-b border-ink bg-paper pt-[env(safe-area-inset-top,0px)]"
    >
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-[padding] duration-300 md:px-8 ${compact ? "py-2.5" : "py-4"}`}>
        <Link href={home} className="focus-ring group flex items-baseline gap-2">
          {lang === "he" ? (
            <span className="text-lg font-bold tracking-[-0.01em]">
              מבצר <span className="font-serif font-normal text-cobalt">העיצוב</span>
            </span>
          ) : (
            <span className="text-lg font-bold tracking-[-0.03em]">
              Anti-AI<span className="font-serif font-normal italic text-cobalt"> UI </span>Vault
            </span>
          )}
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
          <span className="hidden font-mono text-[11px] text-ink-3 lg:inline">{t.nav.count(count)}</span>
          <Link href={`${home}#custom`} className="focus-ring inline-flex items-center gap-1 rounded-full bg-terracotta px-3.5 py-1.5 text-sm font-medium text-paper">
            {t.nav.book} <ArrowUpRight size={14} strokeWidth={1.75} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
      <motion.span style={{ scaleX: progress }} className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-cobalt rtl:origin-right" />
    </motion.header>
  );
}
