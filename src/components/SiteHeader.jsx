"use client";

import { useRef, useState } from "react";
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
    { href: lang === "he" ? "/he/guides" : "/guides", label: t.nav.guides },
    { href: `${home}#custom`, label: t.nav.custom },
  ];
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hover, setHover] = useState(null);
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Hysteresis: hide after ~80px of scrolling down, reveal after ~40px back up.
  const travel = useRef({ anchor: 0, dir: 0 });
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const dir = Math.sign(y - prev);
    const tr = travel.current;
    if (dir && dir !== tr.dir) {
      tr.dir = dir;
      tr.anchor = prev;
    }
    if (y < 240) setHidden(false);
    else if (tr.dir > 0 && y - tr.anchor > 80) setHidden(true);
    else if (tr.dir < 0 && tr.anchor - y > 40) setHidden(false);
    setCompact(y > 40);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink bg-paper pt-[env(safe-area-inset-top,0px)]"
    >
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-[padding] duration-300 md:px-8 ${compact ? "py-2.5" : "py-4"}`}>
        <Link href={home} aria-label={lang === "he" ? "דוגמית עיצוב" : "Specimen Design"} className="focus-ring group flex flex-col leading-none">
          {lang === "he" ? (
            <span className="text-xl font-bold tracking-[-0.01em]">
              דוגמית<span className="text-cobalt">.</span>
            </span>
          ) : (
            <span className="text-xl font-bold tracking-[-0.035em]">
              Speci<span className="font-serif font-normal italic text-cobalt">men</span>
            </span>
          )}
          {/* the second line: a specimen label, set like the caption under a type sample */}
          <span aria-hidden className="mt-1 flex items-center gap-1.5">
            <motion.span
              className="h-px w-5 origin-left bg-terracotta rtl:origin-right"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            />
            <span className={`flex font-mono font-medium uppercase text-terracotta ${lang === "he" ? "text-[11px] tracking-[0.12em]" : "text-[9px] tracking-[0.42em]"}`}>
              {(lang === "he" ? "עיצוב" : "design").split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block group-hover:text-cobalt"
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.4 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
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
