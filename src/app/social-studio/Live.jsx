"use client";

import { Component, useEffect, useRef, useState } from "react";
import { LiveProvider, LivePreview as RLPreview, LiveError } from "react-live";
import { LayoutGroup } from "framer-motion";
import { liveScope } from "@/lib/live-scope";
import "@/lib/preview-guard";

class Boundary extends Component {
  constructor(p) {
    super(p);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    return this.state.error ? <div style={{ padding: 20, fontFamily: "monospace" }}>ERR {String(this.state.error.message)}</div> : this.props.children;
  }
}

/**
 * One design rendered live at its design size and scaled to `box` px wide.
 * Sites: w=1280, natural height. Components: w×h with h-full/w-full root.
 * The inner [data-scroll] layer is moved by the capture script (translateY in design px).
 * `zoom` crops in: the design is scaled by box/w*zoom and offset by `x`/`y` (design px).
 */
export default function Live({ item, w = 1280, h, box, boxH, zoom = 1, x = 0, y = 0, scrollKey, className = "", style }) {
  const s = (box / w) * zoom;
  const inner = useRef(null);
  const [natH, setNatH] = useState(0);
  useEffect(() => {
    if (h || boxH || !inner.current) return;
    const ro = new ResizeObserver(([e]) => setNatH(e.contentRect.height));
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [h, boxH]);
  return (
    <div className={`preview-scope ${className}`} dir="ltr" lang="en" style={{ position: "relative", overflow: "hidden", width: box, height: boxH ?? (h ? h * s : natH * s), ...style }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: w, transform: `scale(${s})`, transformOrigin: "top left" }}>
        <div ref={inner} data-scroll={scrollKey || "main"} style={{ width: w, height: h, transform: `translate(${-x}px, ${-y}px)` }}>
          <Boundary key={item.slug}>
            <LayoutGroup id={`studio-${item.slug}-${scrollKey || ""}`}>
              <LiveProvider code={item.previewCode} scope={liveScope} noInline enableTypeScript={false}>
                <RLPreview className={h ? "h-full w-full" : undefined} />
                <LiveError style={{ background: "#D9534F", color: "#fff", padding: 12, fontFamily: "monospace", fontSize: 11 }} />
              </LiveProvider>
            </LayoutGroup>
          </Boundary>
        </div>
      </div>
    </div>
  );
}
