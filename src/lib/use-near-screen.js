"use client";

import { useEffect, useState } from "react";

const idle = (fn) =>
  typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(fn, { timeout: 400 }) : window.setTimeout(fn, 60);
const cancelIdle = (id) => (typeof window.cancelIdleCallback === "function" ? window.cancelIdleCallback(id) : window.clearTimeout(id));

/**
 * Should a live preview be mounted?
 * Mounts a little before it scrolls into view, on an idle frame so compiling the snippet never lands mid-scroll.
 * Unmounts only once it is well off screen, so scrolling back and forth does not rebuild it every time.
 */
export function useNearScreen(ref, eager = false) {
  const [on, setOn] = useState(eager);
  useEffect(() => {
    if (eager || !ref.current) return;
    const el = ref.current;
    let task = null;
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        if (task == null) task = idle(() => { task = null; setOn(true); });
      },
      { rootMargin: "500px 0px" },
    );
    const far = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) return;
        if (task != null) { cancelIdle(task); task = null; }
        setOn(false);
      },
      { rootMargin: "1600px 0px" },
    );
    near.observe(el);
    far.observe(el);
    return () => {
      near.disconnect();
      far.disconnect();
      if (task != null) cancelIdle(task);
    };
  }, [ref, eager]);
  return on;
}
