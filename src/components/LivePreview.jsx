"use client";

import { Component, useEffect, useRef, useState } from "react";
import { LiveProvider, LivePreview as RLPreview, LiveError } from "react-live";
import { LayoutGroup } from "framer-motion";
import { liveScope } from "@/lib/live-scope";
import "@/lib/preview-guard";
import { useNearScreen } from "@/lib/use-near-screen";

class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-paper-2 p-6 text-center font-mono text-xs text-ink-3">
          Preview paused — {String(this.state.error.message || this.state.error).slice(0, 120)}
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Renders a vault snippet live.
 * - Only mounts while on screen (saves CPU on the grid).
 * - Renders at a fixed design size and scales down to fit, so every snippet keeps its proportions.
 */
export default function LivePreview({ code, id, designWidth = 520, designHeight = 380, className = "", eager = false, fit = false, maxScale = 1.2 }) {
  const wrap = useRef(null);
  const visible = useNearScreen(wrap, eager);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(maxScale, entry.contentRect.width / designWidth, entry.contentRect.height / designHeight));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth, designHeight, maxScale]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`} style={fit ? undefined : { aspectRatio: `${designWidth} / ${designHeight}` }}>
      <div
        className="preview-scope absolute left-1/2 top-1/2"
        dir="ltr"
        lang="en"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        {visible ? (
          <Boundary key={code}>
            <LayoutGroup id={id}>
              <LiveProvider code={code} scope={liveScope} noInline enableTypeScript={false}>
                <RLPreview className="h-full w-full" />
                <LiveError className="absolute inset-x-0 bottom-0 max-h-1/2 overflow-auto bg-terracotta p-3 font-mono text-[11px] text-paper" />
              </LiveProvider>
            </LayoutGroup>
          </Boundary>
        ) : (
          <div className="h-full w-full bg-paper" />
        )}
      </div>
    </div>
  );
}
