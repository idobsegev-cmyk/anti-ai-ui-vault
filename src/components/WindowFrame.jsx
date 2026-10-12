"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import SitePreview from "./SitePreview";
import { useLiveSlot } from "@/lib/live-slots";
import { brandOf, siteHost, sitePalette } from "@/lib/palette";
import { useLang } from "@/lib/i18n";

const PLATES = { ink: "var(--color-ink)", cobalt: "var(--color-cobalt)", terracotta: "var(--color-terracotta)", moss: "var(--color-moss)" };
const SPRING = { stiffness: 260, damping: 22, mass: 0.6 };

/** What a window shows before its live preview runs (and on very small screens): the design's own colors and name. */
export function Poster({ item }) {
  const pal = sitePalette(item.previewCode);
  return (
    <div aria-hidden dir="ltr" lang="en" className="preview-scope absolute inset-0 overflow-hidden" style={{ background: pal.bg, color: pal.fg, containerType: "inline-size" }}>
      <div className="absolute inset-x-0 bottom-0 h-[38%] opacity-60" style={{ background: `repeating-linear-gradient(-45deg, ${pal.accent} 0 9px, transparent 9px 21px)` }} />
      <div className="absolute start-[7%] top-[9%] h-[6%] w-[18%] rounded-full" style={{ background: pal.accent }} />
      <p className="absolute inset-x-[7%] top-[24%] font-bold leading-[0.9]" style={{ fontSize: "12cqw", letterSpacing: "-0.04em" }}>
        {brandOf(item.title)}
      </p>
      <p className="absolute start-[7%] bottom-[44%] font-mono uppercase" style={{ fontSize: "3.4cqw", letterSpacing: "0.18em" }}>
        {item.style}
      </p>
    </div>
  );
}

/**
 * A live design inside a browser window. Asks for a live-preview slot when near the screen,
 * tilts toward the pointer, lifts off its hard shadow on hover, and opens the design on click.
 */
export default function WindowFrame({
  item,
  aspect = "4 / 3",
  plate = "ink",
  live = true,
  priority = 0,
  autoplay = false,
  tilt = true,
  chrome = "md",
  linkLabel,
  className = "",
  sticker = null,
  children,
}) {
  const { t, href, lang } = useLang();
  const dir = lang === "he" ? -1 : 1;
  const reduce = useReducedMotion();
  const body = useRef(null);
  const link = useRef(null);
  const on = useLiveSlot(body, { enabled: live, priority });
  const url = href(`/vault/${item.slug}`);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const lift = useMotionValue(0);
  const srx = useSpring(rx, SPRING);
  const sry = useSpring(ry, SPRING);
  const sl = useSpring(lift, { stiffness: 420, damping: 26 });
  const plateX = useTransform(sl, [0, 1], [5 * dir, 11 * dir]);
  const plateY = useTransform(sl, [0, 1], [5, 11]);
  const winX = useTransform(sl, [0, 1], [0, -3 * dir]);
  const winY = useTransform(sl, [0, 1], [0, -3]);

  const move = (e) => {
    if (reduce || !tilt || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
  };
  const enter = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    lift.set(1);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    lift.set(0);
  };
  const open = (e) => {
    if (e.defaultPrevented) return;
    link.current?.click();
  };

  const small = chrome === "sm";

  return (
    <motion.div
      onPointerMove={move}
      onPointerEnter={enter}
      onPointerLeave={leave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className={`group/win relative ${className}`}
    >
      {/* the hard offset shadow, a plate that the window lifts away from */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[14px]"
        style={{ background: PLATES[plate] || plate, x: plateX, y: plateY }}
      />
      <motion.div
        style={{ x: winX, y: winY }}
        className="relative overflow-hidden rounded-[14px] border border-ink bg-paper"
      >
        <div dir="ltr" className={`flex items-center gap-2 border-b border-ink bg-paper ${small ? "h-6 px-2" : "h-8 px-3"}`}>
          <span aria-hidden className="flex shrink-0 gap-1">
            <i className={`block rounded-full bg-terracotta ${small ? "size-1.5" : "size-2"}`} />
            <i className={`block rounded-full bg-cobalt ${small ? "size-1.5" : "size-2"}`} />
            <i className={`block rounded-full border border-ink ${small ? "size-1.5" : "size-2"}`} />
          </span>
          <Link
            ref={link}
            href={url}
            aria-label={linkLabel}
            tabIndex={linkLabel ? undefined : -1}
            className={`focus-ring min-w-0 flex-1 truncate rounded-full bg-paper-2 px-2.5 font-mono text-ink-2 ${small ? "py-0 text-[9px]" : "py-0.5 text-[11px]"}`}
          >
            {siteHost(item.slug)}
          </Link>
          {!small && !sticker && (
            <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-ink-3">
              <span aria-hidden className={`size-1.5 rounded-full ${on ? "live-dot bg-terracotta" : "bg-ink/25"}`} />
              {t.vault.live}
            </span>
          )}
        </div>
        <div ref={body} onClick={open} data-touch-scroll className="relative cursor-pointer overflow-hidden" style={{ aspectRatio: aspect }}>
          <Poster item={item} />
          {on && (
            <div className="absolute inset-0">
              <SitePreview eager settle code={item.previewCode} id={`win-${item.slug}`} className="w-full" aspect={aspect} autoplay={autoplay} />
            </div>
          )}
        </div>
        {children}
      </motion.div>
      {sticker}
    </motion.div>
  );
}

