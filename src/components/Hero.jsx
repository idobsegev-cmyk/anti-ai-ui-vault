"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Magnetic from "./Magnetic";
import WordRotator from "./WordRotator";
import HeroShowcase from "./HeroShowcase";
import FeatureStrip from "./FeatureStrip";
import { useLang } from "@/lib/i18n";

export default function Hero({ count, featured = [], strip = [] }) {
  const h1 = useRef(null);
  const zone = useRef(null);
  const reduce = useReducedMotion();
  const { t, lang } = useLang();
  const home = lang === "he" ? "/he" : "/";

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
        .from("[data-rotator]", { yPercent: 40, autoAlpha: 0, rotate: -4, duration: 1, ease: "back.out(2.2)" }, "-=0.75")
        .from("[data-hero-fade]", { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=0.6");
    }, zone);
    return () => ctx.revert();
  }, [reduce, lang]);

  return (
    <section ref={zone} className="relative overflow-hidden border-b border-ink pt-24 md:pt-28" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div data-hero-fade className="flex flex-wrap items-center justify-between gap-2 border-b border-ink pb-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span>{t.hero.meta[0]}</span>
          <span className="hidden sm:inline">{t.hero.meta[1](count)}</span>
          <span>{t.hero.meta[2]}</span>
        </div>

        <div className="grid grid-cols-12 items-start gap-x-8 gap-y-8 pb-12 pt-8 md:pb-14 md:pt-10">
          <div className="col-span-12 min-w-0 lg:col-span-7 lg:row-start-1">
            <h1
              key={lang}
              id="hero-title"
              ref={h1}
              style={{ visibility: "hidden" }}
              className="text-[clamp(3rem,7.2vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.055em] rtl:leading-[0.98] rtl:tracking-[-0.02em]"
            >
              <span className="sr-only">{t.hero.sr}</span>
              <span aria-hidden data-split className="block">{t.hero.l1}</span>
              <span aria-hidden data-split className="block">{t.hero.l2}</span>
              <span data-rotator className="block">
                <WordRotator />
              </span>
            </h1>
          </div>

          <div className="col-span-12 flex min-w-0 flex-col gap-8 lg:col-span-7 lg:row-start-2">
            {strip.length > 0 && (
              <div data-hero-fade className="max-w-2xl">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">{t.hero.stripLabel}</p>
                <FeatureStrip lists={strip} />
              </div>
            )}
            <div data-hero-fade className="flex flex-wrap items-center gap-4">
              <Magnetic href={`${home}#vault`} variant="solid">
                {t.hero.browse(count)} <ArrowDown size={16} strokeWidth={1.75} />
              </Magnetic>
              <Magnetic href={`${home}#custom`} variant="outline">
                {t.hero.bookCustom} <ArrowUpRight size={16} strokeWidth={1.75} className="rtl:-scale-x-100" />
              </Magnetic>
            </div>
          </div>

          {featured.length > 0 && (
            <motion.div
              initial={reduce ? false : { y: 30, rotate: 2 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.5 }}
              className="col-span-12 min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:pt-2"
            >
              <HeroShowcase items={featured} />
            </motion.div>
          )}
        </div>
      </div>
      <CategoryMarquee />
    </section>
  );
}

function CategoryMarquee() {
  const { t } = useLang();
  const row = [...t.marquee, ...t.marquee];
  return (
    <div dir="ltr" className="overflow-hidden border-t border-ink bg-ink py-3 text-paper" aria-hidden>
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
