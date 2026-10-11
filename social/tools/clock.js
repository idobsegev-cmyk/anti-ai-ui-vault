(() => {
  // keep every animation on our clock: no Web Animations API, so Framer Motion animates in JS
  try { delete Element.prototype.animate; Element.prototype.animate = undefined; } catch (e) {}
  let now = 0;
  const T0 = 1791700000000;
  let rafQ = [], rafId = 1, timers = [], tid = 1;
  performance.now = () => now;
  const RealDate = Date;
  Date.now = () => T0 + now;
  window.requestAnimationFrame = (cb) => { rafQ.push([rafId, cb]); return rafId++; };
  window.cancelAnimationFrame = (id) => { rafQ = rafQ.filter((x) => x[0] !== id); };
  const add = (fn, ms, a, every) => { const id = tid++; timers.push({ id, at: now + Math.max(0, +ms || 0), fn, a, every }); return id; };
  window.setTimeout = (fn, ms, ...a) => add(fn, ms, a, 0);
  window.setInterval = (fn, ms, ...a) => add(fn, ms, a, Math.max(1, +ms || 1));
  window.clearTimeout = window.clearInterval = (id) => { timers = timers.filter((t) => t.id !== id); };
  window.__advance = (ms) => {
    const target = now + ms;
    for (;;) {
      timers.sort((a, b) => a.at - b.at || a.id - b.id);
      const t = timers[0];
      if (!t || t.at > target) break;
      now = t.at;
      if (t.every) t.at += t.every; else timers.shift();
      try { typeof t.fn === "function" ? t.fn(...t.a) : null; } catch (e) { console.error(e); }
    }
    now = target;
    const q = rafQ; rafQ = [];
    for (const [, cb] of q) { try { cb(now); } catch (e) { console.error(e); } }
  };
})();
