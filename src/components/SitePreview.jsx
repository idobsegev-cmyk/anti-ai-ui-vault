"use client";

import { Component, useEffect, useRef, useState } from "react";
import { LiveProvider, LivePreview as RLPreview, LiveError } from "react-live";
import { LayoutGroup, animate, motion, useMotionValue } from "framer-motion";
import { liveScope } from "@/lib/live-scope";

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
 */
export default function SitePreview({ code, id, mode = "shot", className = "", eager = false, height = "78vh", autoplay = false }) {
  const wrap = useRef(null);
  const inner = useRef(null);
  const [visible, setVisible] = useState(eager);
  const [scale, setScale] = useState(0.3);
  const [fullH, setFullH] = useState(2000);
  const y = useMotionValue(0);
  const ctl = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / PAGE_W));
    ro.observe(el);
    let io;
    if (!eager) {
      io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "300px" });
      io.observe(el);
    }
    return () => {
      ro.disconnect();
      io && io.disconnect();
    };
  }, [eager]);

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
    ctl.current = animate(y, 0, { type: "spring", stiffness: 120, damping: 22 });
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
    <div ref={wrap} onPointerEnter={scrollDown} onPointerLeave={scrollUp} className={`relative overflow-hidden ${className}`} style={{ aspectRatio: "4 / 3" }}>
      <motion.div ref={inner} className="preview-scope absolute left-0 top-0" dir="ltr" lang="en" style={{ width: PAGE_W, y, scale, transformOrigin: "top left" }}>
        {content}
      </motion.div>
    </div>
  );
}
