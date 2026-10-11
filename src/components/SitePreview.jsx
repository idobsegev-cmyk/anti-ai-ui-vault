"use client";

import { Component, useEffect, useRef, useState } from "react";
import { LiveProvider, LivePreview as RLPreview, LiveError } from "react-live";
import { LayoutGroup, animate, motion, useMotionValue } from "framer-motion";
import { liveScope } from "@/lib/live-scope";
import "@/lib/preview-guard";
import { useNearScreen } from "@/lib/use-near-screen";

const PAGE_W = 1280;

class Boundary extends Component {
  constructor(p) {
    super(p);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    return this.state.error ? (
      <div className="p-6 font-mono text-xs text-ink-3">Preview paused — {String(this.state.error.message).slice(0, 120)}</div>
    ) : (
      this.props.children
    );
  }
}

/**
 * A whole website rendered live at desktop width (1280px) and scaled to fit.
 * mode "shot": a 4:3 crop like a Dribbble shot; hovering scrolls down the full page.
 * mode "scroll": a framed browser window you scroll through yourself.
 * mode "full": the whole page laid out at its scaled height, so it scrolls with the real page (no nested scrolling).
 */
export default function SitePreview({ code, id, mode = "shot", className = "", eager = false, settle = false, height = "78vh", autoplay = false, focus = 0, onSection }) {
  const wrap = useRef(null);
  const inner = useRef(null);
  const visible = useNearScreen(wrap, eager);
  const [scale, setScale] = useState(0.3);
  const [fullH, setFullH] = useState(2000);
  const y = useMotionValue(0);
  const ctl = useRef(null);
  // Eager (above-the-fold) previews stay unpainted until the fonts they pull in have settled, so late
  // font swaps do not shift their text. Hidden elements are not counted as layout shift. Capped at 1.2s.
  const [settled, setSettled] = useState(!(eager || settle));
  useEffect(() => {
    if (!(eager || settle) || !visible || settled) return;
    let done = false;
    const fin = () => { if (!done) { done = true; setSettled(true); } };
    const cap = setTimeout(fin, 1200);
    const fonts = document.fonts;
    if (!fonts?.ready) fin();
    else requestAnimationFrame(() => requestAnimationFrame(() => fonts.ready.then(() => setTimeout(fin, 50))));
    return () => clearTimeout(cap);
  }, [eager, settle, visible, settled]);
  const hide = settled ? undefined : { visibility: "hidden" };

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / PAGE_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inner.current) return;
    const ro = new ResizeObserver(([e]) => setFullH(e.contentRect.height || 2000));
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [visible]);

  // Autoplay (hero showcase): glide down the whole page, pause, glide back, repeat.
  useEffect(() => {
    if (!autoplay || !visible || mode !== "shot" || !wrap.current) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dist = Math.max(0, fullH * scale - wrap.current.clientHeight);
    if (dist < 20) return;
    const dur = Math.min(14, 2 + dist / 180);
    const c = animate(y, [0, 0, -dist, -dist, 0], { duration: dur * 2 + 2, times: [0, 0.08, 0.5, 0.6, 1], ease: "easeInOut", repeat: Infinity });
    return () => c.stop();
  }, [autoplay, visible, mode, fullH, scale, y]);

  // Detail-page lens: report which top-level section of the design sits in the middle of the viewport.
  useEffect(() => {
    if (!onSection || !visible || !inner.current) return;
    let io, tries = 0, timer;
    const attach = () => {
      const root = inner.current?.querySelector(":scope > div > div") || inner.current?.firstElementChild?.firstElementChild;
      const kids = root ? Array.from(root.children).filter((el) => el.offsetHeight > 40) : [];
      if (kids.length < 2) {
        if (tries++ < 20) timer = setTimeout(attach, 150);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) onSection(kids.indexOf(e.target), kids.length);
        },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      kids.forEach((k) => io.observe(k));
    };
    attach();
    return () => {
      clearTimeout(timer);
      io?.disconnect();
    };
  }, [onSection, visible, code]);

  // Cards can open on a design's signature moment instead of its first pixel.
  const rest = () => {
    if (!focus || !wrap.current) return 0;
    return -Math.min(focus * scale, Math.max(0, fullH * scale - wrap.current.clientHeight));
  };
  useEffect(() => {
    if (mode === "shot" && !autoplay && focus) y.set(rest());
  }, [scale, fullH, focus, mode, autoplay]);

  const scrollDown = () => {
    if (autoplay) return;
    if (mode !== "shot" || !wrap.current) return;
    const crop = wrap.current.clientHeight;
    const dist = Math.max(0, fullH * scale - crop);
    ctl.current?.stop();
    ctl.current = animate(y, -dist, { duration: Math.min(9, 1.2 + dist / 260), ease: [0.45, 0, 0.25, 1] });
  };
  const scrollUp = () => {
    if (mode !== "shot" || autoplay) return;
    ctl.current?.stop();
    ctl.current = animate(y, rest(), { type: "spring", stiffness: 120, damping: 22 });
  };

  // Hover intent: the card only starts its tour once the pointer rests on it.
  // While the page is scrolling, cards slide under a still cursor; that must not set them all moving.
  const intent = useRef(null);
  const lastScroll = useRef(0);
  useEffect(() => {
    if (mode !== "shot" || autoplay) return;
    const on = () => {
      lastScroll.current = performance.now();
      clearTimeout(intent.current);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      clearTimeout(intent.current);
    };
  }, [mode, autoplay]);
  const touring = useRef(false);
  const arm = (e) => {
    if (e.pointerType !== "mouse" || mode !== "shot" || autoplay || touring.current) return;
    clearTimeout(intent.current);
    intent.current = setTimeout(() => {
      if (performance.now() - lastScroll.current > 250) {
        touring.current = true;
        scrollDown();
      }
    }, 280);
  };
  const disarm = () => {
    clearTimeout(intent.current);
    touring.current = false;
    scrollUp();
  };

  const content = visible ? (
    <Boundary key={code}>
      <LayoutGroup id={id}>
        <LiveProvider code={code} scope={liveScope} noInline enableTypeScript={false}>
          <RLPreview />
          <LiveError className="bg-terracotta p-3 font-mono text-[11px] text-paper" />
        </LiveProvider>
      </LayoutGroup>
    </Boundary>
  ) : (
    <div style={{ height: 1600 }} className="bg-paper" />
  );

  if (mode === "full") {
    return (
      <div ref={wrap} className={`relative overflow-hidden ${className}`} style={{ height: Math.round(fullH * scale) }}>
        <div ref={inner} className="preview-scope absolute left-0 top-0" dir="ltr" lang="en" style={{ width: PAGE_W, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {content}
        </div>
      </div>
    );
  }

  if (mode === "scroll") {
    return (
      <div ref={wrap} className={`relative overflow-y-auto overflow-x-hidden ${className}`} style={{ height }}>
        <div style={{ height: fullH * scale, position: "relative" }}>
          <div ref={inner} className="preview-scope absolute left-0 top-0" dir="ltr" lang="en" style={{ width: PAGE_W, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrap} onPointerEnter={arm} onPointerMove={arm} onPointerLeave={disarm} className={`relative overflow-hidden ${className}`} style={{ aspectRatio: "4 / 3" }}>
      <motion.div ref={inner} className="preview-scope absolute left-0 top-0" dir="ltr" lang="en" style={{ width: PAGE_W, y, scale, transformOrigin: "top left", ...hide }}>
        {content}
      </motion.div>
    </div>
  );
}
