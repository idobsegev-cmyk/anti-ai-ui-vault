"use client";

import { useEffect, useState } from "react";

/*
 * A small budget for live previews on the home page.
 * Every window asks for a slot when it comes near the screen; only a few run their real code at once
 * (a full site rendered at 1280px is heavy). Others show their poster until a slot frees up.
 * Windows that left the screen give their slot to waiting windows that are on it.
 * Mounting is spread over idle frames, so compiling a snippet never lands in the middle of a scroll.
 */

const holders = new Set();
let waiting = [];
const mountQueue = [];
let mounting = false;

const cap = () => (typeof window === "undefined" ? 0 : window.innerWidth < 768 ? 3 : window.innerWidth < 1100 ? 6 : 8);

const idle = (fn) =>
  typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(fn, { timeout: 300 }) : window.setTimeout(fn, 40);

function drainMounts() {
  if (mounting) return;
  const next = mountQueue.shift();
  if (!next) return;
  mounting = true;
  idle(() => {
    if (holders.has(next)) next.set(true);
    // a breath between compiles keeps every frame short
    window.setTimeout(() => {
      mounting = false;
      drainMounts();
    }, 90);
  });
}

function grant(e) {
  holders.add(e);
  mountQueue.push(e);
  drainMounts();
}

function distance(e) {
  const r = e.el.getBoundingClientRect();
  return Math.abs(r.top + r.height / 2 - window.innerHeight / 2) - e.priority * 10000;
}

function pump() {
  if (!waiting.length) return;
  // Evict holders that are no longer on screen when someone visible is waiting.
  for (const h of [...holders]) {
    if (holders.size < cap()) break;
    if (!h.inView) release(h, false);
  }
  waiting = waiting.filter((w) => w.inView);
  waiting.sort((a, b) => distance(a) - distance(b));
  while (holders.size < cap() && waiting.length) grant(waiting.shift());
}

function request(e) {
  if (holders.has(e) || waiting.includes(e)) return;
  if (holders.size < cap()) grant(e);
  else {
    waiting.push(e);
    pump();
  }
}

function release(e, again = true) {
  waiting = waiting.filter((w) => w !== e);
  const i = mountQueue.indexOf(e);
  if (i >= 0) mountQueue.splice(i, 1);
  if (holders.delete(e)) {
    e.set(false);
    if (again) pump();
  }
}

/** Should this window run its live preview right now? */
export function useLiveSlot(ref, { enabled = true, priority = 0 } = {}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const entry = { el, priority, inView: false, set: setOn };
    const near = new IntersectionObserver(
      ([x]) => {
        entry.inView = x.isIntersecting;
        if (x.isIntersecting) request(entry);
        else pump();
      },
      { rootMargin: "120px 0px" },
    );
    const far = new IntersectionObserver(
      ([x]) => {
        if (!x.isIntersecting) release(entry);
      },
      { rootMargin: "700px 0px" },
    );
    near.observe(el);
    far.observe(el);
    return () => {
      near.disconnect();
      far.disconnect();
      release(entry);
    };
  }, [ref, enabled, priority]);
  return enabled && on;
}
